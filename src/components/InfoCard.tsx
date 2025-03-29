import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, Typography, IconButton, Modal, Box } from '@mui/material';
import Grid from '@mui/material/Grid2';
import CloseIcon from '@mui/icons-material/Close';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import styles from './UIComponents.module.css';
import { PointOfInterest } from './neighborhoodInfo';
import dayjs from 'dayjs';

export interface InfoCardContent {
  name: string;
  description: string;
  dateOfFounding?: string;
  pointsOfInterest?: PointOfInterest[];
  images?: string[];
  type: 'SITE' | 'NEIGHBORHOOD';
  parentInfo?: InfoCardContent;
}

interface InfoCardProps {
  info: InfoCardContent | null;
  onClose: () => void;
  onSiteSelect?: (siteId: string) => void;
  onGoBack?: () => void;
}

const InfoCard: React.FC<InfoCardProps> = ({ info, onClose, onSiteSelect, onGoBack }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [animationClass, setAnimationClass] = useState('');
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (info && isFirstRender.current) {
      isFirstRender.current = false;
      setAnimationClass('');

      requestAnimationFrame(() => {
        setAnimationClass(styles.infoCardVisible);
      });
    } else if (info) {
      setAnimationClass(styles.infoCardVisible);
    }

    if (info) {
      setCurrentImageIndex(0);
    }
  }, [info]);

  if (!info) return null;

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
    setAnimationClass(styles.infoCardExit);

    onClose();
  };

  const handlePoiClick = (poiId: string) => {
    if (onSiteSelect) {
      onSiteSelect(poiId);
    }
  };

  return (
    <Card className={`${styles.infoCard} ${animationClass}`}>
      <CardContent style={{ paddingBottom: '8px' }}>
        {}
        {info.parentInfo && (
          <div 
            className={styles.backLink} 
            onClick={onGoBack}
            style={{ 
              color: '#0066cc', 
              cursor: 'pointer', 
              textDecoration: 'none'
            }}
          >
            ← Voltar
          </div>
        )}
        
        <div className={styles.header}>
          <Grid container spacing={1} alignItems='center'>
            <Grid size={11}>
              <Typography variant='h6' className={styles.title}>
                {info.name}
              </Typography>
            </Grid>
            <Grid size={1} sx={{ textAlign: 'right' }}>
              <IconButton aria-label='close' onClick={handleClose} className={styles.closeButton} size='small'>
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
          {info.dateOfFounding && (
            <Typography variant='body2'>Fundado em: {dayjs(info.dateOfFounding).format('DD/MM/YYYY')}</Typography>
          )}
          {}
          {info.pointsOfInterest && info.pointsOfInterest.length > 0 && (
            <div className={styles.poiSection}>
              <Typography variant='body2' sx={{ marginBottom: '6px' }}>
                Pontos de interesse:
              </Typography>
              <ul className={styles.poiList}>
                {info.pointsOfInterest.map((poi) => (
                  <li key={poi.id} className={styles.poiItem}>
                    <span 
                      className={styles.poiLink}
                      onClick={() => handlePoiClick(poi.id)}
                    >
                      {poi.name}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          <Typography
            variant='body2'
            sx={{
              overflowWrap: 'anywhere',
              textAlign: 'justify',
              whiteSpace: 'pre-line',
              '& p': {
                display: 'block',
                marginBottom: '1em',
              },
            }}
          >
            {info.description?.split('\n').map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </Typography>
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
          <IconButton onClick={() => setModalOpen(false)} className={styles.modalClose} size='small'>
            <CloseIcon />
          </IconButton>
        </Box>
      </Modal>
    </Card>
  );
};

export default InfoCard;
