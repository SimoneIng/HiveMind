import connection from "./connection.js";
import { User, Idea, Comment, Feedback } from "../models/index.js";


const users = [
    { userName: 'alice', passwordHash: 'password1' },
    { userName: 'bob', passwordHash: 'password1' },
    { userName: 'carol', passwordHash: 'password1' },
    { userName: 'dave', passwordHash: 'password1' },
    { userName: 'eve', passwordHash: 'password1' },
    { userName: 'frank', passwordHash: 'password1' },
    { userName: 'grace', passwordHash: 'password1' },
    { userName: 'heidi', passwordHash: 'password1' },
    { userName: 'ivan', passwordHash: 'password1' },
    { userName: 'judy', passwordHash: 'password1' },
    { userName: 'mallory', passwordHash: 'password1' },
    { userName: 'oscar', passwordHash: 'password1' },
    { userName: 'peggy', passwordHash: 'password1' },
    { userName: 'trent', passwordHash: 'password1' },
    { userName: 'victor', passwordHash: 'password1' },
    { userName: 'walter', passwordHash: 'password1' },
    { userName: 'xena', passwordHash: 'password1' },
    { userName: 'yvonne', passwordHash: 'password1' },
    { userName: 'zara', passwordHash: 'password1' },
    { userName: 'max', passwordHash: 'password1' }
];
  
 const ideas = [
    { title: 'Recycling App', description: 'An app to help people recycle more effectively.' },
    { title: 'Smart Home Assistant', description: 'An AI-based assistant for managing home devices.' },
    { title: 'Electric Car Charger', description: 'A network of fast electric car chargers.' },
    { title: 'Fitness Tracker', description: 'A wearable device to track fitness activities.' },
    { title: 'Language Learning', description: 'An app to learn new languages interactively.' },
    { title: 'Meal Planner', description: 'An app to help plan and organize meals.' },
    { title: 'Travel Budget', description: 'A tool for planning and managing travel budgets.' },
    { title: 'Pet Care', description: 'An app for managing pet care schedules and activities.' },
    { title: 'Event Organizer', description: 'A tool to organize and manage events.' },
    { title: 'Book Club', description: 'A platform for book lovers to discuss and review books.' },
    { title: 'Gardening Guide', description: 'A comprehensive guide for gardening enthusiasts.' },
    { title: 'Recipe Sharing', description: 'An app to share and discover new recipes.' },
    { title: 'Remote Work', description: 'A platform for remote work opportunities.' },
    { title: 'Mental Health', description: 'An app to support mental health and well-being.' },
    { title: 'Photography Tips', description: 'A guide with tips and tricks for photography.' },
    { title: 'Music Streaming', description: 'A new music streaming platform.' },
    { title: 'Art Community', description: 'A community for artists to share their work.' },
    { title: 'Cooking Classes', description: 'Online cooking classes with professional chefs.' },
    { title: 'Fashion Trends', description: 'An app to keep up with the latest fashion trends.' },
    { title: 'Eco-friendly Products', description: 'A marketplace for eco-friendly products.' },
    { title: 'Virtual Reality', description: 'A platform for virtual reality experiences.' },
    { title: 'Fitness Classes', description: 'Online fitness classes for all levels.' },
    { title: 'Language Exchange', description: 'A platform for language exchange partners.' },
    { title: 'DIY Projects', description: 'Ideas and instructions for DIY projects.' },
    { title: 'Career Advice', description: 'A platform for career advice and mentorship.' }
];

  const createdUsers = await User.bulkCreate(users, {returning: true}); 
  const ideasToInsert = []; 

  createdUsers.forEach(user => {
    const userIdeas = ideas.slice(0,5); 
    userIdeas.forEach(idea => {
        ideasToInsert.push({...idea, userID: user.userID})
    })
  })

  await Idea.bulkCreate(ideasToInsert); 
  await connection.sync(); 

  
