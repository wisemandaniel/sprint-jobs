import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';

const SmallCard = ({item, onClick}) => {
    const navigate = useNavigate()

  return (
    <Card
        style={{
            maxWidth: 250,
            margin: 'auto',
            marginTop: 5,
            borderRadius: 12,
            boxShadow: '0px 12px 18px rgba(0, 0, 0, 0.4)', 
            backgroundColor: 'indigo',
            color: "secondary",
            cursor: 'pointer'
        }}
        elevation={18}
        bgcolor="secondary.main"
        >
        <CardContent onClick={onClick} >
            <Typography variant="h6" component="div" style={{ color: 'white' }}>
            <Typography
                display="inline"
                style={{ fontSize: 14 }}
            >
                From:{' '}
            </Typography>{' '}
            <Typography display="inline" fontSize={16} fontWeight="bold">
                {item.creator.username}
            </Typography>
            </Typography>
            <Typography variant="body2" style={{ color: 'white', marginTop: 2 }}>
            Date: {new Date(item.createdAt).toLocaleDateString()}
            </Typography>
        </CardContent>
        </Card>

  );
};

export default SmallCard;
