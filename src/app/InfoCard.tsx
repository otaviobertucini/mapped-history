import React from 'react';
import { Card, CardContent, Typography, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

interface InfoCardProps {
  info: any;
  onClose: () => void;
}

const InfoCard: React.FC<InfoCardProps> = ({ info, onClose }) => {
  console.log(`🚀 ~ info:`, info)
  if (!info) return null;

  return (
    <Card
      sx={{
        position: 'absolute',
        top: '10%',
        left: '10px',
        width: 300,
        backgroundColor: 'white',
        boxShadow: 3,
        zIndex: 10,
      }}
    >
      <CardContent>
        <IconButton
          aria-label='close'
          onClick={onClose}
          sx={{ position: 'absolute', right: 5, top: 5 }}
        >
          <CloseIcon />
        </IconButton>
        <Typography variant='h6'>
          {info.name}
        </Typography>
        <Typography variant='body2'>
          {info.description}
        </Typography>
        {info.dateOfFounding && (
          <Typography variant='body2'>Founded: {info.dateOfFounding}</Typography>
        )}
        {info.pointsOfInterest && (
          <Typography variant='body2'>Points of Interest: {info.pointsOfInterest.join(', ')}</Typography>
        )}
      </CardContent>
    </Card>
  );
};

export default InfoCard;