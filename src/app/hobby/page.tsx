'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { SectionHeader } from '@/components/ui';
import { Photo } from '@/types';

// Social/Creative Links for Banner Slideshow
const creativeLinks = [
  {
    id: 'youtube',
    platform: 'YouTube',
    url: 'https://www.youtube.com/@pavitramandal37',
    description: 'Video content, tutorials & vlogs',
    icon: (
      <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
      </svg>
    ),
    bgGradient: 'from-red-600 to-red-700',
    hoverColor: 'hover:bg-red-600',
  },
  {
    id: 'instagram',
    platform: 'Instagram',
    url: 'https://www.instagram.com/pavitra.hito/',
    description: 'Photography & creative moments',
    icon: (
      <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
      </svg>
    ),
    bgGradient: 'from-purple-600 via-pink-600 to-orange-500',
    hoverColor: 'hover:bg-pink-600',
  },
  {
    id: 'linkedin',
    platform: 'LinkedIn',
    url: 'https://www.linkedin.com/in/pavitra-mandal-b0b0571a0/',
    description: 'Professional networking & articles',
    icon: (
      <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    ),
    bgGradient: 'from-blue-600 to-blue-700',
    hoverColor: 'hover:bg-blue-600',
  },
];

// Sample photos for gallery - Replace with your actual photos
// Add your photos to /public/images/gallery/
const photos: Photo[] = [
  { id: '1', src: '/images/gallery/photo-1.jpg', alt: 'Photography sample 1', category: 'Landscape' },
  { id: '2', src: '/images/gallery/photo-2.jpg', alt: 'Photography sample 2', category: 'Portrait' },
  { id: '3', src: '/images/gallery/photo-3.jpg', alt: 'Photography sample 3', category: 'Street' },
  { id: '4', src: '/images/gallery/photo-4.jpg', alt: 'Photography sample 4', category: 'Landscape' },
  { id: '5', src: '/images/gallery/photo-5.jpg', alt: 'Photography sample 5', category: 'Nature' },
  { id: '6', src: '/images/gallery/photo-6.jpg', alt: 'Photography sample 6', category: 'Portrait' },
  { id: '7', src: '/images/gallery/photo-7.jpg', alt: 'Photography sample 7', category: 'Street' },
  { id: '8', src: '/images/gallery/photo-8.jpg', alt: 'Photography sample 8', category: 'Architecture' },
  { id: '9', src: '/images/gallery/photo-9.jpg', alt: 'Photography sample 9', category: 'Landscape' },
  { id: '10', src: '/images/gallery/photo-10.jpg', alt: 'Photography sample 10', category: 'Nature' },
  { id: '11', src: '/images/gallery/photo-11.jpg', alt: 'Photography sample 11', category: 'Portrait' },
  { id: '12', src: '/images/gallery/photo-12.jpg', alt: 'Photography sample 12', category: 'Travel' },
];

// Get unique categories
const categories: string[] = ['All', ...Array.from(new Set(photos.map((p) => p.category).filter((c): c is string => Boolean(c))))];

// Banner Slideshow Component
function BannerSlideshow() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % creativeLinks.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  return (
    <div className="relative h-[400px] md:h-[500px] overflow-hidden rounded-2xl">
      {/* Slides */}
      {creativeLinks.map((link, index) => (
        <a
          key={link.id}
          href={link.url.startsWith('[PLACEHOLDER') ? '#' : link.url}
          target={link.url.startsWith('[PLACEHOLDER') ? '_self' : '_blank'}
          rel="noopener noreferrer"
          className={`absolute inset-0 transition-all duration-700 ease-in-out ${
            index === currentSlide
              ? 'opacity-100 translate-x-0'
              : index < currentSlide
              ? 'opacity-0 -translate-x-full'
              : 'opacity-0 translate-x-full'
          }`}
        >
          <div
            className={`absolute inset-0 bg-gradient-to-br ${link.bgGradient} flex flex-col items-center justify-center text-white p-8 text-center`}
          >
            {/* Animated Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 left-0 w-72 h-72 bg-white rounded-full filter blur-3xl animate-float" />
              <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full filter blur-3xl animate-float" style={{ animationDelay: '2s' }} />
            </div>

            {/* Content */}
            <div className="relative z-10">
              <div className="mb-6 transform transition-transform duration-500 hover:scale-110">
                {link.icon}
              </div>
              <h3 className="text-4xl md:text-5xl font-bold mb-4">{link.platform}</h3>
              <p className="text-xl md:text-2xl text-white/80 mb-6">{link.description}</p>
              {!link.url.startsWith('[PLACEHOLDER') && (
                <span className="inline-flex items-center px-6 py-3 bg-white/20 rounded-full text-lg font-medium backdrop-blur-sm hover:bg-white/30 transition-colors">
                  Visit Channel
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </span>
              )}
              {link.url.startsWith('[PLACEHOLDER') && (
                <span className="inline-flex items-center px-6 py-3 bg-white/10 rounded-full text-lg font-medium">
                  Coming Soon
                </span>
              )}
            </div>
          </div>
        </a>
      ))}

      {/* Navigation Dots */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-3 z-20">
        {creativeLinks.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? 'bg-white w-8'
                : 'bg-white/50 hover:bg-white/75'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={() => setCurrentSlide((prev) => (prev - 1 + creativeLinks.length) % creativeLinks.length)}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/30 transition-colors z-20"
        aria-label="Previous slide"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/30 transition-colors z-20"
        aria-label="Next slide"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
}

// Photo Gallery Item Component
function GalleryItem({ photo, onClick }: { photo: Photo; onClick: () => void }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  return (
    <div
      className="group relative aspect-square overflow-hidden rounded-lg cursor-pointer"
      onClick={onClick}
    >
      {/* Placeholder while loading or on error */}
      <div className={`absolute inset-0 bg-gradient-to-br from-navy-200 to-teal-100 flex items-center justify-center ${isLoaded && !hasError ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}>
        <div className="text-center">
          <svg className="w-12 h-12 text-navy-300 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <p className="text-xs text-navy-400">{hasError ? 'Image not found' : 'Loading...'}</p>
        </div>
      </div>

      {/* Actual Image */}
      <Image
        src={photo.src}
        alt={photo.alt}
        fill
        className={`object-cover transition-all duration-500 group-hover:scale-110 ${isLoaded && !hasError ? 'opacity-100' : 'opacity-0'}`}
        onLoad={() => setIsLoaded(true)}
        onError={() => setHasError(true)}
      />

      {/* Hover Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-navy-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="absolute bottom-0 left-0 right-0 p-4">
          {photo.category && (
            <span className="inline-block px-2 py-1 text-xs font-medium bg-teal-500 text-white rounded-full mb-2">
              {photo.category}
            </span>
          )}
          <p className="text-white text-sm">{photo.alt}</p>
        </div>
        {/* Zoom Icon */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

// Lightbox Component
function Lightbox({ photo, onClose, onPrev, onNext }: { photo: Photo; onClose: () => void; onPrev: () => void; onNext: () => void }) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, onPrev, onNext]);

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors z-10"
        aria-label="Close"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {/* Navigation */}
      <button
        onClick={onPrev}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
        aria-label="Previous"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button
        onClick={onNext}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
        aria-label="Next"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Image */}
      <div className="relative max-w-5xl max-h-[80vh] w-full h-full">
        <Image
          src={photo.src}
          alt={photo.alt}
          fill
          className="object-contain"
          priority
        />
      </div>

      {/* Caption */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-center text-white">
        {photo.category && (
          <span className="inline-block px-3 py-1 text-sm font-medium bg-teal-500 rounded-full mb-2">
            {photo.category}
          </span>
        )}
        <p className="text-lg">{photo.alt}</p>
      </div>
    </div>
  );
}

export default function HobbyPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [lightboxPhoto, setLightboxPhoto] = useState<Photo | null>(null);

  const filteredPhotos = selectedCategory === 'All'
    ? photos
    : photos.filter((p) => p.category === selectedCategory);

  const currentPhotoIndex = lightboxPhoto ? filteredPhotos.findIndex((p) => p.id === lightboxPhoto.id) : -1;

  const handlePrev = () => {
    if (currentPhotoIndex > 0) {
      setLightboxPhoto(filteredPhotos[currentPhotoIndex - 1]);
    } else {
      setLightboxPhoto(filteredPhotos[filteredPhotos.length - 1]);
    }
  };

  const handleNext = () => {
    if (currentPhotoIndex < filteredPhotos.length - 1) {
      setLightboxPhoto(filteredPhotos[currentPhotoIndex + 1]);
    } else {
      setLightboxPhoto(filteredPhotos[0]);
    }
  };

  return (
    <div className="pt-20">
      {/* Header */}
      <section className="section-padding bg-gradient-to-br from-navy-50 to-teal-50/30">
        <div className="max-w-6xl mx-auto">
          <SectionHeader
            title="Hobbies & Creative Side"
            subtitle="Beyond code, I express creativity through photography, video content, and visual storytelling"
          />
        </div>
      </section>

      {/* Banner Slideshow */}
      <section className="section-padding">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-navy-900 mb-6">Connect with my creative work</h2>
          <BannerSlideshow />
        </div>
      </section>

      {/* Photo Gallery */}
      <section className="section-padding bg-background-alt">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
            <h2 className="text-2xl font-bold text-navy-900 mb-4 md:mb-0">Photography Gallery</h2>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    selectedCategory === category
                      ? 'bg-teal-600 text-white'
                      : 'bg-white text-navy-600 hover:bg-navy-100 border border-navy-200'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Masonry-style Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredPhotos.map((photo, index) => (
              <div
                key={photo.id}
                className={`${
                  // Create varied heights for masonry effect
                  index % 5 === 0 ? 'md:row-span-2' : ''
                }`}
                style={{
                  animationDelay: `${index * 50}ms`,
                }}
              >
                <GalleryItem
                  photo={photo}
                  onClick={() => setLightboxPhoto(photo)}
                />
              </div>
            ))}
          </div>

          {/* Empty State */}
          {filteredPhotos.length === 0 && (
            <div className="text-center py-16">
              <svg className="w-16 h-16 text-navy-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <p className="text-navy-500">No photos in this category yet.</p>
            </div>
          )}

          {/* Add Photos Notice */}
          <div className="mt-12 p-6 bg-white rounded-xl border border-card-border text-center">
            <p className="text-navy-600 mb-2">
              <span className="font-semibold">Note:</span> Add your photographs to{' '}
              <code className="px-2 py-1 bg-navy-100 rounded text-sm">/public/images/gallery/</code>
            </p>
            <p className="text-navy-500 text-sm">
              Name them photo-1.jpg, photo-2.jpg, etc. and update the photos array in this file.
            </p>
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightboxPhoto && (
        <Lightbox
          photo={lightboxPhoto}
          onClose={() => setLightboxPhoto(null)}
          onPrev={handlePrev}
          onNext={handleNext}
        />
      )}
    </div>
  );
}
