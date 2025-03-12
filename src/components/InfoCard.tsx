/* eslint-disable @next/next/no-img-element */
import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, Typography, IconButton, Modal, Box } from '@mui/material';
import Grid from '@mui/material/Grid2';
import CloseIcon from '@mui/icons-material/Close';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import styles from './UIComponents.module.css';

export interface InfoCardContent {
  name: string;
  description: string;
  dateOfFounding?: string;
  pointsOfInterest?: string[];
  images?: string[];
  type: 'SITE' | 'NEIGHBORHOOD';
}

interface InfoCardProps {
  info: InfoCardContent | null;
  onClose: () => void;
}

const InfoCard: React.FC<InfoCardProps> = ({ info, onClose }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const [isRendered, setIsRendered] = useState(false);
  const exitTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Apply slight delay before showing the card to ensure smooth animation
  useEffect(() => {
    if (info) {
      setTimeout(() => {
        setIsRendered(true);
      }, 10);
      
      setIsExiting(false);
      // Reset the current image index for new content
      setCurrentImageIndex(0);
      
      // Clear any pending exit animations
      if (exitTimeoutRef.current) {
        clearTimeout(exitTimeoutRef.current);
        exitTimeoutRef.current = null;
      }
    } else {
      setIsRendered(false);
    }
  }, [info]);

  // Don't render anything if no info
  if (!info) return null;
  
  // Don't apply animation styles until we're ready to render
  // This prevents the initial flickering
  if (!isRendered) {
    return (
      <div style={{ position: 'absolute', opacity: 0 }} aria-hidden="true"></div>
    );
  }

  const handlePrevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev > 0 ? prev - 1 : prev));
  };

  const handleNextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev < (info.images?.length || 1) - 1 ? prev + 1 : prev));
  };

  const handleImageClick = (index: number) => {
    setCurrentImageIndex(index);
    setModalOpen(true);
  };

  const handleClose = () => {
    // Start exit animation
    setIsExiting(true);
    
    // Clear any existing timeout
    if (exitTimeoutRef.current) {
      clearTimeout(exitTimeoutRef.current);
    }
    
    // Wait for animation to complete before actually closing
    exitTimeoutRef.current = setTimeout(() => {
      onClose();
      exitTimeoutRef.current = null;
    }, 300); // Match this with the CSS animation duration
  };

  return (
    <Card 
      className={`${styles.infoCard} ${isExiting ? styles.infoCardExit : ''}`}
    >
      <CardContent style={{ paddingBottom: '8px' }}>
        <div className={styles.header}>
          <Grid container spacing={1} alignItems='center'>
            <Grid size={11}>
              <Typography variant='h6' className={styles.title}>
                {info.name}
              </Typography>
            </Grid>
            <Grid size={1} sx={{ textAlign: 'right' }}>
              <IconButton 
                aria-label='close' 
                onClick={handleClose} 
                className={styles.closeButton} 
                size='small'
              >
                <CloseIcon fontSize='small' />
              </IconButton>
            </Grid>
          </Grid>
        </div>

        <div className={styles.content}>
          {info.images && info.images.length > 0 && (
            <div className={styles.gallery}>
              <IconButton
                className={styles.galleryArrow}
                onClick={handlePrevImage}
                size='small'
                disabled={info.images.length <= 1}
                sx={{ opacity: currentImageIndex === 0 ? 0.3 : 1 }}
              >
                <ArrowBackIosIcon />
              </IconButton>

              <div className={styles.galleryImageContainer}>
                <div className={`${styles.imageWrapper} ${styles.prevImage}`}>
                  {currentImageIndex > 0 && (
                    <img
                      src={info.images[currentImageIndex - 1]}
                      alt={`${info.name} - previous`}
                      className={styles.galleryImage}
                      onClick={() => handleImageClick(currentImageIndex - 1)}
                    />
                  )}
                </div>
                <div className={`${styles.imageWrapper} ${styles.currentImage}`}>
                  <img
                    src={info.images[currentImageIndex]}
                    alt={`${info.name} - ${currentImageIndex + 1}`}
                    className={styles.galleryImage}
                    onClick={() => handleImageClick(currentImageIndex)}
                  />
                </div>
                <div className={`${styles.imageWrapper} ${styles.nextImage}`}>
                  {currentImageIndex < info.images.length - 1 && (
                    <img
                      src={info.images[currentImageIndex + 1]}
                      alt={`${info.name} - next`}
                      className={styles.galleryImage}
                      onClick={() => handleImageClick(currentImageIndex + 1)}
                    />
                  )}
                </div>
              </div>
              <IconButton
                className={styles.galleryArrow}
                onClick={handleNextImage}
                size='small'
                disabled={info.images.length <= 1}
                sx={{ opacity: currentImageIndex === info.images.length - 1 ? 0.3 : 1 }}
              >
                <ArrowForwardIosIcon />
              </IconButton>
            </div>
          )}
          <Typography
            variant='body2'
            sx={{
              overflowWrap: 'anywhere',
            }}
          >
            {info.description}
          </Typography>
          {info.dateOfFounding && <Typography variant='body2'>Founded: {info.dateOfFounding}</Typography>}
          {info.pointsOfInterest && (
            <Typography variant='body2'>Points of Interest: {info.pointsOfInterest.join(', ')}</Typography>
          )}
        </div>
      </CardContent>
      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        className={styles.modal}
        closeAfterTransition
        slotProps={{
          backdrop: {
            timeout: 300,
            style: {
              transition: 'opacity 0.3s ease-in-out',
            },
          },
        }}
      >
        <Box className={styles.modalContent}>
          <img
            src={info.images?.[currentImageIndex]}
            alt={`${info.name} - ${currentImageIndex + 1}`}
            className={styles.modalImage}
          />
          <IconButton 
            onClick={() => setModalOpen(false)} 
            className={styles.modalClose}
            size='small'
          >
            <CloseIcon />
          </IconButton>
        </Box>
      </Modal>
    </Card>
  );
};

export default InfoCard;
