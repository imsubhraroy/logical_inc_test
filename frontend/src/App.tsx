import { useState, useEffect, useCallback, useRef } from 'react';
import { Plus, Search, Loader2, LogOut, } from 'lucide-react';
import { mediaApi } from './lib/api';
import { Media, MediaFormData, MediaType } from './types';
import { MediaTable } from './components/MediaTable';
import { MediaForm } from './components/MediaForm';
import { AuthForm } from './components/AuthForm';
import { useAuth } from './contexts/AuthContext';
import { Button } from './components/ui/button';
import { Input } from './components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from './components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from './components/ui/alert-dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './components/ui/select';
import React from 'react';

function App() {
  const { user, isLoading: authLoading, isAuthenticated, logout } = useAuth();
  const [media, setMedia] = useState<Media[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingMedia, setEditingMedia] = useState<Media | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<MediaType | ''>('');
  const [isSaving, setIsSaving] = useState(false);

  const observer = useRef<IntersectionObserver | null>(null);
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const loadMedia = useCallback(
    async (pageNum: number, reset = false) => {
      if (isLoading || !isAuthenticated) return;

      setIsLoading(true);
      try {
        const response = await mediaApi.getAll(
          pageNum,
          20,
          searchQuery || undefined,
          typeFilter || undefined
        );

        setMedia((prev) => (reset ? response.data : [...prev, ...response.data]));
        setHasMore(response.pagination.hasMore);
      } catch (error) {
        console.error('Failed to load media:', error);
      } finally {
        setIsLoading(false);
      }
    },
    [searchQuery, typeFilter, isLoading, isAuthenticated, isSaving]
  );

  useEffect(() => {
    if (isAuthenticated) {
      setMedia([]);
      setPage(1);
      loadMedia(1, true);
    }
  }, [searchQuery, typeFilter, isAuthenticated]);

  const lastMediaRef = useCallback(
    (node: HTMLTableRowElement | null) => {
      if (isLoading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prevPage) => {
            const nextPage = prevPage + 1;
            loadMedia(nextPage);
            return nextPage;
          });
        }
      });

      if (node) observer.current.observe(node);
    },
    [isLoading, hasMore, loadMedia]
  );

  const handleSearch = (value: string) => {
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    searchTimeoutRef.current = setTimeout(() => {
      setSearchQuery(value);
    }, 300);
  };

  const handleSubmit = async (data: MediaFormData) => {
    setIsSaving(true);
    try {
      if (editingMedia) {
        await mediaApi.update(editingMedia.id, { ...data, description: data?.description ?? "" });
      } else {
        await mediaApi.create(data);
      }

      setIsDialogOpen(false);
      setEditingMedia(null);
      setMedia([]);
      setPage(1);
      loadMedia(1, true);
    } catch (error) {
      console.error('Failed to save media:', error);
      alert('Failed to save media. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;

    try {
      await mediaApi.delete(deleteId);
      setMedia((prev) => prev.filter((item) => item.id !== deleteId));
      setDeleteId(null);
    } catch (error) {
      console.error('Failed to delete media:', error);
      alert('Failed to delete media. Please try again.');
    }
  };

  const openAddDialog = () => {
    setEditingMedia(null);
    setIsDialogOpen(true);
  };

  const openEditDialog = (media: Media) => {
    setEditingMedia(media);
    setIsDialogOpen(true);
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-indigo-600" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <AuthForm />;
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Movies & TV Shows Manager</h1>
            <p className="text-sm text-muted-foreground">Welcome back, {user?.name}!</p>
          </div>
          <Button variant="outline" onClick={logout}>
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by title or director..."
              onChange={(e) => handleSearch(e.target.value)}
              className="pl-10"
            />
          </div>

          <Select
            value={typeFilter}
            onValueChange={(value) =>
              setTypeFilter(value === '0' ? '' : (value as MediaType | ''))
            }
          >
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="All Types" />
            </SelectTrigger>
            <SelectContent className='bg-white'>
              <SelectItem value="0">All Types</SelectItem>
              <SelectItem value="MOVIE">Movies</SelectItem>
              <SelectItem value="TV_SHOW">TV Shows</SelectItem>
            </SelectContent>
          </Select>

          <Button onClick={openAddDialog} className="w-full sm:w-auto cursor-pointer">
            <Plus className="mr-2 h-4 w-4" />
            Add New
          </Button>
        </div>

        <MediaTable
          media={media}
          onEdit={openEditDialog}
          onDelete={setDeleteId}
          loadMoreRef={lastMediaRef}
        />

        {isLoading && (
          <div className="flex justify-center py-8">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        )}

        {!isLoading && !hasMore && media.length > 0 && (
          <p className="text-center text-muted-foreground py-8">
            No more items to load
          </p>
        )}

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-white">
            <DialogHeader>
              <DialogTitle>
                {editingMedia ? 'Edit Media' : 'Add New Media'}
              </DialogTitle>
            </DialogHeader>
            <MediaForm
              initialData={editingMedia || undefined}
              onSubmit={handleSubmit}
              onCancel={() => setIsDialogOpen(false)}
              isLoading={isSaving}
            />
          </DialogContent>
        </Dialog>

        <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
          <AlertDialogContent className='bg-white'>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete this
                media entry from the database.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <div className="flex justify-end gap-2">
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={handleDelete}
                className="bg-red-600 hover:bg-red-700"
              >
                Delete
              </AlertDialogAction>
            </div>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}

export default App;