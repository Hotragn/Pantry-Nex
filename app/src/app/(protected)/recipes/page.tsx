'use client';

import React, { useState, useEffect } from 'react';
import { Button, TextField, Typography, Container, Box } from '@mui/material';

const HUGGINGFACE_API_KEY = process.env.NEXT_PUBLIC_HUGGINGFACE_API_KEY; // Ensure you set this in your .env.local file

const Recipes: React.FC = () => {
  const [userInput, setUserInput] = useState<string>('');
  const [response, setResponse] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [recipes, setRecipes] = useState<string[]>([]); // State to hold fetched recipes

  // Fetch recipes from Firestore or your preferred source
  useEffect(() => {
    // Mocked recipe data for demonstration
    setRecipes(["tomatoes", "cheese", "bread"]);
  }, []);

  const handleAsk = async () => {
    setLoading(true);
    try {
      const res = await fetch("https://api-inference.huggingface.co/models/gpt2", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${HUGGINGFACE_API_KEY}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          "inputs": userInput
        })
      });

      const data = await res.json();
      setResponse(data[0]?.generated_text || 'No response received.');
    } catch (error) {
      console.error('Error fetching data:', error);
      setResponse('Error fetching response.');
    } finally {
      setLoading(false);
    }
  };

  const handleSuggestRecipes = async () => {
    setLoading(true);
    try {
      const query = recipes.join(', ');
      const res = await fetch("https://api-inference.huggingface.co/models/gpt2", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${HUGGINGFACE_API_KEY}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          "inputs": `${query}`
        })
      });

      const data = await res.json();
      setResponse(data[0]?.generated_text || 'No response received.');
    } catch (error) {
      console.error('Error fetching data:', error);
      setResponse('Error fetching response.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Recipe Chatbot
      </Typography>
      <Box mb={2}>
        <TextField
          label="Ask a question"
          variant="outlined"
          fullWidth
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
        />
      </Box>
      <Box mb={2}>
        <Button variant="contained" color="primary" onClick={handleAsk} disabled={loading}>
          Ask
        </Button>
        <Button variant="contained" color="secondary" onClick={handleSuggestRecipes} disabled={loading} style={{ marginLeft: '10px' }}>
          Suggest Recipes
        </Button>
      </Box>
      {loading && <Typography>Loading...</Typography>}
      {response && (
        <Box mt={2} p={2} border={1} borderColor="grey.400">
          <Typography variant="h6">Response:</Typography>
          <Typography>{response}</Typography>
        </Box>
      )}
    </Container>
  );
};

export default Recipes;
