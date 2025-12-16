import { useEffect, useState } from 'react';
import api from '@/lib/api';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { ExternalLink } from 'lucide-react';

interface UrlItem {
  short_code: string;
  original_url: string;
  click_count: number;
  created_at: string;
}

interface UrlListProps {
    keyProp: number; // to force refresh
}

export default function UrlList({ keyProp }: UrlListProps) {
  const [urls, setUrls] = useState<UrlItem[]>([]);
  const [loading, setLoading] = useState(true);

  const API_URL = import.meta.env.VITE_API_URL;

  const fetchUrls = async () => {
    setLoading(true);
    try {
      const response = await api.get('/urls');
      setUrls(response.data);
    } catch (error) {
      console.error('Failed to fetch URLs', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUrls();
  }, [keyProp]);

  if (loading && urls.length === 0) {
      return (
          <Card>
              <CardContent className="p-8 text-center text-gray-500">Loading...</CardContent>
          </Card>
      )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Links</CardTitle>
      </CardHeader>
      <CardContent>
        {urls.length === 0 ? (
          <p className="text-center text-gray-500 py-8">No links found. Create one above!</p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Short Link</TableHead>
                <TableHead className="hidden md:table-cell">Original URL</TableHead>
                <TableHead>Clicks</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {urls.map((url) => (
                <TableRow key={url.short_code}>
                  <TableCell className="font-medium">
                    <a
                      href={`${API_URL}/${url.short_code}`}
                      target="_blank"
                      rel="noreferrer"
                      className="text-blue-600 hover:underline flex items-center gap-1"
                    >
                      {url.short_code}
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </TableCell>
                  <TableCell className="hidden md:table-cell truncate max-w-[200px]" title={url.original_url}>
                    {url.original_url}
                  </TableCell>
                  <TableCell>{url.click_count || 0}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm" onClick={() => {
                         navigator.clipboard.writeText(`${API_URL}/${url.short_code}`)
                    }}>
                      Copy
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
}
