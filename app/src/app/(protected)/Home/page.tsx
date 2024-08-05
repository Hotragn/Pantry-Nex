'use client';
import React, { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  Typography,
  Grow,
  Card,
  CardContent,
  Avatar,
  Stack,
  styled,
  CardHeader,
  IconButton,
  Collapse,
  Switch,
  FormControlLabel,
  CardActions,
  Button,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';

// Styled Card for Technology Stack
const TechCard = styled(Card)(({ theme }) => ({
  padding: '20px',
  backgroundColor: '#e1f5fe', // Light blue background
  transition: 'transform 0.3s, box-shadow 0.3s, z-index 0.3s',
  boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
  position: 'relative',
  '&:hover': {
    transform: 'translateY(-10px) scale(1.1)',
    zIndex: 1,
    boxShadow: '0 8px 16px rgba(0,0,0,0.3)',
  },
}));

// Styled Card for Hero Section
const HeroCard = styled(Card)(({ theme }) => ({
    padding: '20px',
    backgroundColor: '#e1f5fe', // Light blue background
    transition: 'transform 0.3s, box-shadow 0.3s',
    boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    height: '400px',
    backgroundImage: `url(https://images.unsplash.com/photo-1556911220-bff31c812dba?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80)`, // Replace with background image path
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    '&:hover': {
      transform: 'translateY(-10px) scale(1.1)',
      zIndex: 1,
      boxShadow: '0 8px 16px rgba(0,0,0,0.3)',
    },
  }));

// Styled Accordion for Features
const StyledAccordion = styled(Card)(({ theme }) => ({
  backgroundColor: '#ffeb3b', // Bright yellow background
  marginBottom: '20px',
  transition: 'transform 0.3s, box-shadow 0.3s',
  boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
  '&:hover': {
    transform: 'scale(1.05)',
    boxShadow: '0 8px 16px rgba(0,0,0,0.3)',
  },
}));

const ExpandMore = styled(({ expand, ...other }: { expand: boolean; [key: string]: any }) => (
  <IconButton {...other} />
))(({ theme }) => ({
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

const IntroductionPage: React.FC = () => {
  const [showContent, setShowContent] = useState(false);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [features] = useState([
    { title: 'Tip 1', description: '🎉 Inventory Regularly ', details: '1- Conduct a thorough check of your pantry at least once a month. 2- Identify expired items, items you no longer use, and those running low. 3- Create a shopping list based on your inventory.' },
    { title: 'Tip 2', description: '🚀 Proper Storage', details: 'Store food items in airtight containers to keep them fresh and prevent pests. Prevent accidents by placing heavier items on lower shelves. Maximize your pantry space and visibility by using shelf risers.' },
    { title: 'Tip 3', description: '✨ First In, First Out (FIFO)', details: ' Always use the oldest items in your pantry first to avoid waste. Regularly rotate your stock to ensure nothing gets forgotten and expires.' },
    { title: 'Feature 1', description: '🌟 Easy Navigation', details: ':)' },
    { title: 'Feature 2', description: '🔥 Customizable Options', details: 'You can Update, add image, and delete' },
    { title: 'Feature 3', description: '💡 Innovative Solutions', details: 'Generate Recipes with more precise answers, coming soon!!!' },
  ]);

  const technologyStack = [
    { name: 'Frontend', description: 'Material UI, Next.js' },
    { name: 'Backend', description: 'Firebase Firestore, Firebase Authentication, Firebase Storage' },
    { name: 'Deployment', description: 'Vercel' },
    { name: 'AI Integration', description: 'OpenAI' },
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowContent(true);
    }, 500); // Transition delay

    return () => clearTimeout(timer);
  }, []);

  const handleExpandClick = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <Box sx={{ padding: '20px', overflowY: 'scroll', height: '100vh', backgroundColor: '#f0f4c3' }}>
    {/* Hero Section */}
      <HeroCard>
        <Typography variant="h2" component="h2" gutterBottom>
        Store It Digitally, Cook It Creatively!
        </Typography>
        <Typography variant="body1" component="p" align="center">
            Welcome to PantryNex! We help you manage your pantry and create delicious recipes with the ingredients you have.
        </Typography>
        <Button variant="contained" color="primary" sx={{ marginTop: '20px' }} onClick={() => window.location.href = '/dashboard'}>
  Get Started
</Button>

      </HeroCard>

      {/* Spacer */}
      {/* Intro Section with Avatar */}
      <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: '40px' }}>
        {/* <Avatar alt="PN" src="/static/images/avatar/1.jpg" /> */}
      </Box>
      <Typography variant="h4" align="center" sx={{ color: '#3f51b5', marginBottom: '20px' }}>
        Here are some important Tips & Features for decent pantry management🎊
      </Typography>

      {/* Key Features Section using Accordions */}
      <Grid container spacing={2}>
        {features.map((feature, index) => (
          <Grid item xs={12} sm={6} md={4} key={feature.title}>
            <Grow in={showContent} style={{ transformOrigin: '0 0 0' }} timeout={(index + 1) * 500}>
              <StyledAccordion elevation={3}>
                <CardHeader
                  title={feature.title}
                />
                <CardContent>
                  <Typography variant="body2">{feature.description}</Typography>
                </CardContent>
                <CardActions disableSpacing>
                  <ExpandMore
                    expand={expandedIndex === index}
                    onClick={() => handleExpandClick(index)}
                    aria-expanded={expandedIndex === index}
                    aria-label="show more"
                  >
                    <ExpandMoreIcon />
                  </ExpandMore>
                </CardActions>
                <Collapse in={expandedIndex === index} timeout="auto" unmountOnExit>
                  <CardContent>
                    <Typography>{feature.details}</Typography>
                  </CardContent>
                </Collapse>
              </StyledAccordion>
            </Grow>
          </Grid>
        ))}
      </Grid>

      {/* Technology Stack Section */}
      <Box sx={{ marginTop: '40px' }}>
        <Typography variant="h4" gutterBottom sx={{ color: '#0288d1' }}>
          🌐 Technology Stack
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
          {technologyStack.map((tech, index) => (
            <Grow
              key={tech.name}
              in={true}
              style={{ transformOrigin: '0 0 0' }}
              timeout={(index + 1) * 500}
            >
              <Box>
                <TechCard elevation={3}>
                  <CardContent>
                    <Typography variant="h5" sx={{ fontWeight: 'bold' }}>{tech.name}</Typography>
                    <Typography variant="body2">{tech.description}</Typography>
                  </CardContent>
                </TechCard>
              </Box>
            </Grow>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default IntroductionPage;