//src/app/dashboard/page.tsx
"use client";

// pages/index.tsx
import React, { useState, FC } from 'react';
import PantryForm from '../../../components/pantry/PantryForm';
import PantryList from '../../../components/pantry/PantryList';
import { Container, Typography } from '@mui/material';
import { PantryItem } from '../../../components/pantry/types';

const Home: FC = () => {
  const [itemToEdit, setItemToEdit] = useState<PantryItem | null>(null);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Pantry Management
      </Typography>
      <PantryForm itemToEdit={itemToEdit} setItemToEdit={setItemToEdit} />
      <PantryList setItemToEdit={setItemToEdit} />
    </Container>
  );
};

export default Home;