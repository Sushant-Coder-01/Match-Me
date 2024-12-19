import { Photo } from "@prisma/client";
import { create } from "zustand";


interface PhotoStore {
  photos: Photo[];
  setPhotos: (photos: Photo[]) => void;
  addPhoto: (photo: Photo) => void;
  removePhoto: (photoId: string) => void;
}

export const usePhotoStore = create<PhotoStore>((set) => ({
  photos: [],
  setPhotos: (photos) => set({ photos }),
  addPhoto: (photo) =>
    set((state) => ({ photos: [...state.photos, photo] })),
  removePhoto: (photoId) =>
    set((state) => ({
      photos: state.photos.filter((photo) => photo.id !== photoId),
    })),
}));