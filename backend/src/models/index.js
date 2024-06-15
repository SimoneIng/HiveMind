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
User.Ideas = User.hasMany(Idea, { foreignKey: {allowNull: false, name: 'userID'}, onDelete: 'CASCADE' }); 
Idea.User = Idea.belongsTo(User, {foreignKey: {allowNull: false, name: 'userID'} }); 

User.Comments = User.hasMany(Comment, { foreignKey: {allowNull: false, name: 'userID'}, onDelete: 'CASCADE' }); 
Comment.User = Comment.belongsTo(User, {foreignKey: {allowNull: false, name: 'userID'} }); 

User.Feedbacks = User.hasMany(Feedback, { foreignKey: {allowNull: false, name: 'userID'}, onDelete: 'CASCADE' }); 
Feedback.User = Feedback.belongsTo(User, { foreignKey: {allowNull: false, name: 'userID'} }); 

Idea.Comments = Idea.hasMany(Comment, { foreignKey: {allowNull: false, name: 'ideaID'}, onDelete: 'CASCADE' }); 
Comment.Idea = Comment.belongsTo(Idea, { foreignKey: {allowNull: false, name: 'ideaID'} }); 

Idea.Feedbacks = Idea.hasMany(Feedback, { foreignKey: {allowNull: false, name: 'ideaID'}, onDelete: 'CASCADE' }); 
Feedback.Idea = Feedback.belongsTo(Idea, { foreignKey: {allowNull: false, name: 'ideaID'} }); 

// l'opzione 'as' serve a creare metodi di convienenza per effettuare operazioni dalle istanze stesse di un Model

// export dei Models 
export { User, Comment, Idea, Feedback }; 