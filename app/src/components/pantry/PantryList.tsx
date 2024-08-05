// // components/PantryList.tsx
// import React, { useEffect, useState, FC } from 'react';
// import { db } from '../../config/firebase';
// import { collection, doc, onSnapshot, query, updateDoc } from 'firebase/firestore';
// import { TextField, List, ListItem, ListItemText, Table, TableBody, TableCell, TableHead, TableRow, TableContainer, Grid, CardContent, Button, Card, Typography } from '@mui/material';
// import { PantryItem } from '../../components/pantry/types';

// interface PantryListProps {
//   setItemToEdit: (item: PantryItem | null) => void;
// }

// const PantryList: FC<PantryListProps> = ({ setItemToEdit }) => {
//   const [items, setItems] = useState<PantryItem[]>([]);
//   const [searchTerm, setSearchTerm] = useState<string>('');

//   useEffect(() => {
//     const unsubscribe = onSnapshot(collection(db, 'pantry'), (snapshot) => {
//       const itemList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as PantryItem[];
//       setItems(itemList);
//     });
//     return () => unsubscribe();
//   }, []);

//   const filteredItems = items.filter(item => 
//     item.name.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const handleQuantityChange = async (item: PantryItem, change: number) => {
//     const newQuantity = item.quantity + change;
//     if (newQuantity >= 0) {
//       await updateDoc(doc(db, 'pantry', item.id!), { quantity: newQuantity });
//     }
//   };

//   return (
//     <>
//       <TextField
//         label="Search Pantry Items"
//         variant="outlined"
//         fullWidth
//         onChange={(e) => setSearchTerm(e.target.value)}
//       />
//       <Grid container spacing={2} style={{ marginTop: '20px' }}>
//         {filteredItems.map(item => (
//           <Grid item xs={12} sm={6} md={4} key={item.id}>
//             <Card variant="outlined">
//               <CardContent>
//                 <Typography variant="h6">{item.name}</Typography>
//                 <Typography variant="body1">Quantity: {item.quantity}</Typography>
//                 {item.imageUrl && (
//                   <div style={{ width: '100%', height: 'auto', overflow: 'hidden', display: 'flex', justifyContent: 'center' }}>
//                     <img src={item.imageUrl} alt={item.name} style={{ maxWidth: '100%', maxHeight: '200px', objectFit: 'contain' }} />
//                   </div>
//                 )}
//                 <Button 
//                   variant="contained" 
//                   color="primary" 
//                   onClick={() => handleQuantityChange(item, 1)} 
//                   style={{ marginRight: '10px' }}
//                 >
//                   +
//                 </Button>
//                 <Button 
//                   variant="contained" 
//                   color="secondary" 
//                   onClick={() => handleQuantityChange(item, -1)}
//                 >
//                   -
//                 </Button>
//                 <Button 
//                   variant="outlined" 
//                   color="error" 
//                   onClick={() => setItemToEdit(item)} 
//                   style={{ marginLeft: '10px' }}
//                 >
//                   Edit
//                 </Button>
//               </CardContent>
//             </Card>
//           </Grid>
//         ))}
//       </Grid>
//     </>
//   );
// };

// export default PantryList;

// // components/PantryList.tsx
import React, { useEffect, useState, FC } from 'react';
import { db } from '../../config/firebase';
import { collection, doc, onSnapshot, updateDoc } from 'firebase/firestore';
import { TextField, Grid, Card, CardContent, Typography, Button, IconButton } from '@mui/material';
import { PantryItem } from '../../components/pantry/types';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import EditIcon from '@mui/icons-material/Edit';

interface PantryListProps {
  setItemToEdit: (item: PantryItem | null) => void;
}

const PantryList: FC<PantryListProps> = ({ setItemToEdit }) => {
  const [items, setItems] = useState<PantryItem[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'pantry'), (snapshot) => {
      const itemList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as PantryItem[];
      setItems(itemList);
    });
    return () => unsubscribe();
  }, []);

  const filteredItems = items.filter(item => 
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleQuantityChange = async (item: PantryItem, change: number) => {
    const newQuantity = item.quantity + change;
    if (newQuantity >= 0) {
      await updateDoc(doc(db, 'pantry', item.id!), { quantity: newQuantity });
    }
  };
  

  return (
    <>
      <TextField
        label="Search Pantry Items"
        variant="outlined"
        fullWidth
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ marginBottom: '20px' }}
      />
      <Grid container spacing={2}>
        {filteredItems.map(item => (
          <Grid item xs={12} sm={6} md={4} key={item.id}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h6">{item.name}</Typography>
                <Typography variant="body1">Quantity: {item.quantity}</Typography>
                {item.imageUrl && (
                  <div style={{ width: '100%', height: 'auto', overflow: 'hidden', display: 'flex', justifyContent: 'center' }}>
                    <img src={item.imageUrl} alt={item.name} style={{ maxWidth: '100%', maxHeight: '200px', objectFit: 'contain' }} />
                  </div>
                )}
                <div style={{ marginTop: '10px', display: 'flex', justifyContent: 'space-between' }}>
                  <IconButton 
                    color="primary" 
                    onClick={() => handleQuantityChange(item, 1)}
                  >
                    <AddIcon />
                  </IconButton>
                  <IconButton 
                    color="secondary" 
                    onClick={() => handleQuantityChange(item, -1)}
                  >
                    <RemoveIcon />
                  </IconButton>
                  <IconButton 
                    color="default" 
                    onClick={() => setItemToEdit(item)}
                  >
                    <EditIcon />
                  </IconButton>
                </div>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default PantryList;
