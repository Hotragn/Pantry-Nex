// import {
//     Box,
//     Button,
//     CircularProgress,
//     Divider,
//     IconButton,
//     Paper,
//     TextField,
//     Typography,
//     Slide,
//     Stack,
//     useTheme
//   } from "@mui/material";
//   import { useState } from "react";
//   import SendIcon from "@mui/icons-material/Send";
//   import ClearIcon from "@mui/icons-material/Clear";
//   import { TransitionGroup, CSSTransition } from "react-transition-group";
  
//   interface Message {
//     text: string;
//     type: "user" | "bot";
//   }
  
//   const RecipeSuggestions: React.FC = () => {
//     const [messages, setMessages] = useState<Message[]>([]);
//     const [input, setInput] = useState("");
//     const [loading, setLoading] = useState(false);
  
//     const theme = useTheme();
  
//     const handleSend = async (action: "ask" | "suggest") => {
//       if (input.trim() === "") return;
  
//       setMessages([...messages, { text: input, type: "user" }]);
//       setInput("");
//       setLoading(true);
  
//       try {
//         const res = await fetch("/api/generate-recipes", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({ prompt: input }),
//         });
//         const data = await res.json();
//         const responseText = action === "ask"
//           ? `Here is an answer to your question: ${data.message}`
//           : `Based on your ingredients, we suggest: ${data.recipes.join(", ")}`;
        
//         setMessages([...messages, { text: input, type: "user" }, { text: responseText, type: "bot" }]);
//       } catch (error) {
//         setMessages([...messages, { text: input, type: "user" }, { text: "Error fetching response.", type: "bot" }]);
//       } finally {
//         setLoading(false);
//       }
//     };
  
//     return (
//       <Paper elevation={3} sx={{ p: 3, borderRadius: 2, mt: 2, height: "80vh", display: "flex", flexDirection: "column" }}>
//         <Box sx={{ flexGrow: 1, overflowY: "auto", mb: 2 }}>
//           <Typography variant="h5" align="center" gutterBottom>
//             💬 Chatbot for Recipe Suggestions
//           </Typography>
//           <Divider sx={{ mb: 2 }} />
//           <TransitionGroup>
//             {messages.map((msg, index) => (
//               <CSSTransition key={index} timeout={300} classNames="message">
//                 <Slide direction={msg.type === "bot" ? "up" : "down"} in mountOnEnter unmountOnExit>
//                   <Box sx={{ mb: 2, display: "flex", justifyContent: msg.type === "bot" ? "flex-start" : "flex-end" }}>
//                     <Box
//                       sx={{
//                         maxWidth: "70%",
//                         p: 2,
//                         borderRadius: 2,
//                         bgcolor: msg.type === "bot" ? theme.palette.grey[200] : theme.palette.primary.main,
//                         color: msg.type === "bot" ? theme.palette.text.primary : theme.palette.text.secondary,
//                         boxShadow: 2,
//                       }}
//                     >
//                       {msg.text}
//                     </Box>
//                   </Box>
//                 </Slide>
//               </CSSTransition>
//             ))}
//             {loading && (
//               <CSSTransition timeout={300} classNames="message">
//                 <Slide direction="up" in mountOnEnter unmountOnExit>
//                   <Box sx={{ mb: 2, display: "flex", justifyContent: "center" }}>
//                     <CircularProgress />
//                   </Box>
//                 </Slide>
//               </CSSTransition>
//             )}
//           </TransitionGroup>
//         </Box>
//         <Box sx={{ display: "flex", flexDirection: "column" }}>
//           <TextField
//             variant="outlined"
//             value={input}
//             onChange={(e) => setInput(e.target.value)}
//             onKeyDown={(e) => {
//               if (e.key === "Enter") {
//                 handleSend("ask"); // Default action
//               }
//             }}
//             placeholder="Type your message..."
//             fullWidth
//             sx={{ mb: 1 }}
//           />
//           <Stack direction="row" spacing={1} justifyContent="space-between">
//             <Button
//               variant="contained"
//               color="primary"
//               onClick={() => handleSend("ask")}
//               endIcon={<SendIcon />}
//             >
//               Ask Question
//             </Button>
//             <Button
//               variant="outlined"
//               color="secondary"
//               onClick={() => handleSend("suggest")}
//               endIcon={<SendIcon />}
//             >
//               Suggest Recipes
//             </Button>
//             <IconButton
//               color="default"
//               onClick={() => setMessages([])}
//               sx={{ ml: 1 }}
//             >
//               <ClearIcon />
//             </IconButton>
//           </Stack>
//         </Box>
//       </Paper>
//     );
//   };
  
//   export default RecipeSuggestions;
  