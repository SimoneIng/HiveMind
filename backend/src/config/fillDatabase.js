import connection from "./connection.js";
import { User, Idea, Comment, Feedback } from "../models/index.js";

const users = [
    { userName: 'alice', passwordHash: 'passwordHash123' },
    { userName: 'bob', passwordHash: 'passwordHash123' },
    { userName: 'carol', passwordHash: 'passwordHash123' },
    { userName: 'dave', passwordHash: 'passwordHash123' },
    { userName: 'eve', passwordHash: 'passwordHash123' },
    { userName: 'frank', passwordHash: 'passwordHash123' },
    { userName: 'grace', passwordHash: 'passwordHash123' },
    { userName: 'heidi', passwordHash: 'passwordHash123' },
    { userName: 'ivan', passwordHash: 'passwordHash123' },
    { userName: 'judy', passwordHash: 'passwordHash123' },
    { userName: 'mallory', passwordHash: 'passwordHash123' },
    { userName: 'oscar', passwordHash: 'passwordHash123' },
    { userName: 'peggy', passwordHash: 'passwordHash123' },
    { userName: 'trent', passwordHash: 'passwordHash123' },
    { userName: 'victor', passwordHash: 'passwordHash123' },
    { userName: 'walter', passwordHash: 'passwordHash123' },
    { userName: 'xena', passwordHash: 'passwordHash123' },
    { userName: 'yvonne', passwordHash: 'passwordHash123' },
    { userName: 'zara', passwordHash: 'passwordHash123' },
    { userName: 'max', passwordHash: 'passwordHash123' }
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

