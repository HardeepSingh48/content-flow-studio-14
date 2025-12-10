import { Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Scene } from '@/types/content';

interface SceneCardProps {
  scene: Scene;
  onChange: (scene: Scene) => void;
  onDelete: () => void;
  canDelete: boolean;
}

const SceneCard = ({ scene, onChange, onDelete, canDelete }: SceneCardProps) => {
  const updateField = (field: keyof Scene, value: string | number) => {
    onChange({ ...scene, [field]: value });
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-sm font-medium text-primary">
            {scene.sceneNumber}
          </div>
          <span className="font-medium text-foreground">Scene {scene.sceneNumber}</span>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <Label htmlFor={`duration-${scene.id}`} className="text-sm text-muted-foreground">
              Duration (s):
            </Label>
            <Input
              id={`duration-${scene.id}`}
              type="number"
              min={1}
              max={120}
              value={scene.duration}
              onChange={(e) => updateField('duration', parseInt(e.target.value) || 0)}
              className="w-20 h-8"
            />
          </div>
          
          {canDelete && (
            <Button
              variant="ghost"
              size="icon"
              className="text-muted-foreground hover:text-destructive"
              onClick={onDelete}
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          )}
        </div>
      </div>
      
      <div className="space-y-4">
        <div>
          <Label htmlFor={`script-${scene.id}`} className="text-sm font-medium mb-2 block">
            Script
          </Label>
          <Textarea
            id={`script-${scene.id}`}
            value={scene.script}
            onChange={(e) => updateField('script', e.target.value)}
            placeholder="What should be said in this scene..."
            className="min-h-[100px]"
          />
        </div>
        
        <div>
          <Label htmlFor={`visual-${scene.id}`} className="text-sm font-medium mb-2 block">
            Visual Direction
          </Label>
          <Textarea
            id={`visual-${scene.id}`}
            value={scene.visualNotes}
            onChange={(e) => updateField('visualNotes', e.target.value)}
            placeholder="Describe the visuals, transitions, effects..."
            className="min-h-[80px]"
          />
        </div>
      </div>
    </div>
  );
};

export default SceneCard;
