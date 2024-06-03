import UserModel from './user.js'; 
import CommentModel from './comment.js'; 
import IdeaModel from './idea.js'; 
import FeedbackModel from './feedback.js'; 
import connection from '../config/connection.js';


// Definizione Model del database 
const User = connection.define('User', UserModel, {timestamps: false}); 
const Comment = connection.define('Comment', CommentModel, {timestamps: false});
const Idea = connection.define('Idea', IdeaModel, {timestamps: false}); 
const Feedback = connection.define('Feedback', FeedbackModel, {timestamps: false});

// Definizione Associazioni tra Models 
User.Ideas = User.hasMany(Idea, { onDelete: 'CASCADE' }); 
Idea.User = Idea.belongsTo(User); 

User.Comments = User.hasMany(Comment, { onDelete: 'CASCADE' }); 
Comment.User = Comment.belongsTo(User); 

User.Feedbacks = User.hasMany(Feedback, { onDelete: 'CASCADE' }); 
Feedback.User = Feedback.belongsTo(User); 

Idea.Comments = Idea.hasMany(Comment, { onDelete: 'CASCADE' }); 
Comment.Idea = Comment.belongsTo(Idea); 

Idea.Feedbacks = Idea.hasMany(Feedback, { onDelete: 'CASCADE' }); 
Feedback.Idea = Feedback.belongsTo(Idea); 


// export dei Models 
export { User, Comment, Idea, Feedback }; 