import React from 'react';
import { Card, CardContent, Typography, IconButton } from '@mui/material';
import Grid from '@mui/material/Grid2';
import CloseIcon from '@mui/icons-material/Close';
import styles from './InfoCard.module.css';

interface InfoCardProps {
  info: any;
  onClose: () => void;
}

const InfoCard: React.FC<InfoCardProps> = ({ info, onClose }) => {
  if (!info) return null;

  return (
    <Card className={styles.infoCard}>
      <CardContent style={{ paddingBottom: '8px' }}>
        {/* Fixed Header */}
        <div className={styles.header}>
          <Grid container spacing={1} alignItems='center'>
            <Grid size={11}>
              <Typography variant='h6' className={styles.title}>
                {info.name}
              </Typography>
            </Grid>
            <Grid size={1} sx={{ textAlign: 'right' }}>
              <IconButton aria-label='close' onClick={onClose} className={styles.closeButton} size='small'>
                <CloseIcon fontSize='small' />
              </IconButton>
            </Grid>
          </Grid>
        </div>

        {/* Scrollable Content */}
        <div className={styles.content}>
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
    </Card>
  );
};

export default InfoCard;
