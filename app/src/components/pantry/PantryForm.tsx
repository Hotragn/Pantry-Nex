// // components/PantryForm.tsx
// import React, { useState, FC, useEffect } from 'react';
// import { db } from '../../config/firebase';
// import { collection, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
// import { TextField, Button, Grid } from '@mui/material';
// import { PantryItem } from '../pantry/types';

// interface PantryFormProps {
//   itemToEdit: PantryItem | null;
//   setItemToEdit: (item: PantryItem | null) => void;
// }

// const PantryForm: FC<PantryFormProps> = ({ itemToEdit, setItemToEdit }) => {
//   const [itemName, setItemName] = useState<string>('');
//   const [itemQuantity, setItemQuantity] = useState<number>(1);
//   const [itemId, setItemId] = useState<string | null>(null);
//   const [imageUrl, setImageUrl] = useState<string>('');

//   // Effect to populate the form when an item is selected for editing
//   useEffect(() => {
//     if (itemToEdit) {
//       setItemName(itemToEdit.name);
//       setItemQuantity(itemToEdit.quantity);
//       setImageUrl(itemToEdit.imageUrl || '');
//       setItemId(itemToEdit.id || null);
//     } else {
//       setItemName('');
//       setItemQuantity(1);
//       setImageUrl('');
//       setItemId(null);
//     }
//   }, [itemToEdit]);

//   const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setImageUrl(reader.result as string);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     const newItem: PantryItem = { name: itemName, quantity: itemQuantity, imageUrl };

//     try {
//       if (itemId) {
//         await updateDoc(doc(db, 'pantry', itemId), newItem as { [x: string]: any; });
//       } else {
//         await addDoc(collection(db, 'pantry'), newItem);
//       }
//       setItemName('');
//       setItemQuantity(1);
//       setImageUrl('');
//       setItemId(null);
//       setItemToEdit(null);
//     } catch (error) {
//       console.error("Error adding/updating document: ", error);
//     }
//   };

//   const handleDelete = async () => {
//     if (itemId) {
//       try {
//         await deleteDoc(doc(db, 'pantry', itemId));
//         setItemName('');
//         setItemQuantity(1);
//         setImageUrl('');
//         setItemId(null);
//         setItemToEdit(null);
//       } catch (error) {
//         console.error("Error deleting document: ", error);
//       }
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <Grid container spacing={2}>
//         <Grid item xs={6}>
//           <TextField
//             label="Pantry Item"
//             variant="outlined"
//             fullWidth
//             value={itemName}
//             onChange={(e) => setItemName(e.target.value)}
//           />
//         </Grid>
//         <Grid item xs={6}>
//           <TextField
//             label="Quantity"
//             type="number"
//             variant="outlined"
//             fullWidth
//             value={itemQuantity}
//             onChange={(e) => setItemQuantity(Number(e.target.value))}
//             inputProps={{ min: 1 }}
//           />
//         </Grid>
//         <Grid item xs={6}>
//           <input
//             type="file"
//             accept="image/*"
//             onChange={handleImageUpload}
//           />
//         </Grid>
//         <Grid item xs={6}>
//           {imageUrl && (
//             <div style={{ width: '100%', height: 'auto', overflow: 'hidden', display: 'flex', justifyContent: 'center' }}>
//               {/* eslint-disable-next-line @next/next/no-img-element */}
//               <img src={imageUrl} alt="Preview" style={{ maxWidth: '100%', maxHeight: '200px', objectFit: 'contain' }} />
//             </div>
//           )}
//         </Grid>
//         <Grid item xs={4}>
//           <Button type="submit" variant="contained" color="primary">
//             {itemId ? 'Update' : 'Add'}
//           </Button>
//           {itemId && (
//             <Button onClick={handleDelete} variant="contained" color="secondary">
//               Delete
//             </Button>
//           )}
//         </Grid>
//       </Grid>
//     </form>
//   );
// };

// export default PantryForm;


// components/PantryForm.tsx



import React, { useState, FC, useEffect } from 'react';
import { db } from '../../config/firebase';
import { collection, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { TextField, Button, Grid, IconButton } from '@mui/material';
import { PantryItem } from '../pantry/types';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import DeleteIcon from '@mui/icons-material/Delete';

interface PantryFormProps {
  itemToEdit: PantryItem | null;
  setItemToEdit: (item: PantryItem | null) => void;
}

const PantryForm: FC<PantryFormProps> = ({ itemToEdit, setItemToEdit }) => {
  const [itemName, setItemName] = useState<string>('');
  const [itemQuantity, setItemQuantity] = useState<number>(1);
  const [itemId, setItemId] = useState<string | null>(null);
  const [imageUrl, setImageUrl] = useState<string>('');

  // Effect to populate the form when an item is selected for editing
  useEffect(() => {
    if (itemToEdit) {
      setItemName(itemToEdit.name);
      setItemQuantity(itemToEdit.quantity);
      setImageUrl(itemToEdit.imageUrl || '');
      setItemId(itemToEdit.id || null);
    } else {
      setItemName('');
      setItemQuantity(1);
      setImageUrl('');
      setItemId(null);
    }
  }, [itemToEdit]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newItem: PantryItem = {
      name: itemName, quantity: itemQuantity, imageUrl,
      labels: [],
      category: '',
      expirationDate:''
    };

    try {
      if (itemId) {
        await updateDoc(doc(db, 'pantry', itemId), newItem as { [x: string]: any; });
      } else {
        await addDoc(collection(db, 'pantry'), newItem);
      }
      setItemName('');
      setItemQuantity(1);
      setImageUrl('');
      setItemId(null);
      setItemToEdit(null);
    } catch (error) {
      console.error("Error adding/updating document: ", error);
    }
  };

  const handleDelete = async () => {
    if (itemId) {
      try {
        await deleteDoc(doc(db, 'pantry', itemId));
        setItemName('');
        setItemQuantity(1);
        setImageUrl('');
        setItemId(null);
        setItemToEdit(null);
      } catch (error) {
        console.error("Error deleting document: ", error);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <TextField
            label="Pantry Item"
            variant="outlined"
            fullWidth
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Quantity"
            type="number"
            variant="outlined"
            fullWidth
            value={itemQuantity}
            onChange={(e) => setItemQuantity(Number(e.target.value))}
            inputProps={{ min: 1 }}
          />
        </Grid>
        <Grid item xs={6}>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            style={{ display: 'none' }}
            id="image-upload"
          />
          <label htmlFor="image-upload">
            <IconButton component="span" color="primary">
              <AddPhotoAlternateIcon />
            </IconButton>
          </label>
        </Grid>
        <Grid item xs={6}>
          {imageUrl && (
            <div style={{ width: '100%', height: 'auto', overflow: 'hidden', display: 'flex', justifyContent: 'center' }}>
              <img src={imageUrl} alt="Preview" style={{ maxWidth: '100%', maxHeight: '200px', objectFit: 'contain' }} />
            </div>
          )}
        </Grid>
        <Grid item xs={4}>
          <Button type="submit" variant="contained" color="primary">
            {itemId ? 'Update' : 'Add'}
          </Button>
          {itemId && (
            <IconButton onClick={handleDelete} color="secondary" style={{ marginLeft: '10px' }}>
              <DeleteIcon />
            </IconButton>
          )}
        </Grid>
      </Grid>
    </form>
  );
};

export default PantryForm;

