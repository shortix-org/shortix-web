import { useState, type ChangeEvent, type FormEvent } from 'react';
import api from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Loader2 } from 'lucide-react';

interface CreateUrlFormProps {
  onSuccess?: () => void;
}

export default function CreateUrlForm({ onSuccess }: CreateUrlFormProps) {
  const [url, setUrl] = useState('');
  const [error, setError] = useState('');
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (newUrl: string) => {
      return api.post('/urls', { url: newUrl });
    },
    onSuccess: () => {
      setUrl('');
      setError('');
      queryClient.invalidateQueries({ queryKey: ['urls'] });
      if (onSuccess) {
        onSuccess();
      }
    },
    onError: (err: Error) => {
      console.error(err);
      setError('Failed to create short URL');
    },
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!url) return;
    mutation.mutate(url);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Shorten New URL</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="flex gap-4 items-end">
          <div className="flex-1 space-y-2">
            <Label htmlFor="url">Long URL</Label>
            <Input
              id="url"
              type="url"
              placeholder="https://example.com/very/long/url"
              value={url}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setUrl(e.target.value)}
              required
              disabled={mutation.isPending}
            />
          </div>
          <Button type="submit" disabled={mutation.isPending}>
            {mutation.isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Shortening...
              </>
            ) : (
              'Shorten'
            )}
          </Button>
        </form>
        {error && <p className="text-sm text-red-500 mt-2">{error}</p>}
      </CardContent>
    </Card>
  );
}
