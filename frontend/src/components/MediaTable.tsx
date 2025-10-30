import { Edit, Trash2, Film } from 'lucide-react';
import { Media } from '../types';
import { Button } from './ui/button';
import { formatCurrency, formatDuration } from '../lib/utils';
import React from 'react';

interface MediaTableProps {
  media: Media[];
  onEdit: (media: Media) => void;
  onDelete: (id: number) => void;
  loadMoreRef: (node: HTMLTableRowElement | null) => void;
}

export function MediaTable({ media, onEdit, onDelete, loadMoreRef }: MediaTableProps) {
  if (media.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <Film className="h-16 w-16 text-muted-foreground mb-4" />
        <h3 className="text-lg font-semibold">No media found</h3>
        <p className="text-sm text-muted-foreground mt-1">
          Get started by adding your first movie or TV show
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-md border overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b bg-muted/50">
              <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                Image
              </th>
              <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                Title
              </th>
              <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                Type
              </th>
              <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                Director
              </th>
              <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                Budget
              </th>
              <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                Location
              </th>
              <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                Duration
              </th>
              <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                Year
              </th>
              <th className="h-12 px-4 text-right align-middle font-medium text-muted-foreground">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {media.map((item, index) => (
              <tr
                key={item.id}
                ref={index === media.length - 1 ? loadMoreRef : undefined}
                className="border-b transition-colors hover:bg-muted/50"
              >
                <td className="p-4 align-middle">
                  {item.imageUrl ? (
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="h-16 w-12 object-cover rounded"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          'https://via.placeholder.com/48x64?text=No+Image';
                      }}
                    />
                  ) : (
                    <div className="h-16 w-12 bg-muted rounded flex items-center justify-center">
                      <Film className="h-6 w-6 text-muted-foreground" />
                    </div>
                  )}
                </td>
                <td className="p-4 align-middle font-medium">
                  <div className="max-w-xs">
                    <div className="font-semibold">{item.title}</div>
                    {item.description && (
                      <div className="text-sm text-muted-foreground line-clamp-2 mt-1">
                        {item.description}
                      </div>
                    )}
                  </div>
                </td>
                <td className="p-4 align-middle">
                  <span
                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                      item.type === 'MOVIE'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-purple-100 text-purple-800'
                    }`}
                  >
                    {item.type === 'MOVIE' ? 'Movie' : 'TV Show'}
                  </span>
                </td>
                <td className="p-4 align-middle">{item.director}</td>
                <td className="p-4 align-middle">{formatCurrency(item.budget)}</td>
                <td className="p-4 align-middle">{item.location}</td>
                <td className="p-4 align-middle">{formatDuration(item.duration)}</td>
                <td className="p-4 align-middle">{item.year}</td>
                <td className="p-4 align-middle text-right">
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onEdit(item)}
                      title="Edit"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onDelete(item.id)}
                      title="Delete"
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}