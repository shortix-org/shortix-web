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
import { ExternalLink, Loader2 } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';

interface UrlItem {
  short_code: string;
  original_url: string;
  click_count: number;
  created_at: string;
  status: string;
}

const getStatusBadge = (status: string) => {
  const s = status?.toUpperCase() || 'UNKNOWN';
  let classes = 'bg-gray-100 text-gray-800';

  if (s === 'ACTIVE') classes = 'bg-green-100 text-green-800';
  else if (s === 'PENDING' || s === 'PROCESSING') classes = 'bg-blue-100 text-blue-800';
  else if (s === 'INACTIVE' || s === 'BANNED' || s === 'FAILED') classes = 'bg-red-100 text-red-800';

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${classes}`}>
      {s}
    </span>
  );
};

const API_URL = import.meta.env.VITE_API_URL;

export default function UrlList() {
  const { data: urls = [], isLoading, error } = useQuery({
    queryKey: ['urls'],
    queryFn: async () => {
      const response = await api.get('/urls');
      return response.data as UrlItem[];
    },
  });

  if (isLoading && urls.length === 0) {
    return (
      <Card>
        <CardContent className="p-8 text-center text-gray-500 flex flex-col items-center gap-2">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p>Loading your links...</p>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardContent className="p-8 text-center text-red-500">
          Failed to load URLs. Please try again later.
        </CardContent>
      </Card>
    );
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
                <TableHead>Status</TableHead>
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
                  <TableCell>{getStatusBadge(url.status)}</TableCell>
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
