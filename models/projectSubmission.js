const mongoose = require('mongoose');
const cors = require('cors');


const proejctSubmissionSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
    },
    description:{
        type: String,
        required: true
    },
    budget:{
        type: Number,
        required: true,
    },
    deadline:{
        type:String,
        required:true,
    },
    category:{
        type: String,
        required:true
    },
    location: {
        type: String,
        required: true,
      },
      coordinates: {
        type: String,
        required: true,
      },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'Signup' }

});
const ProjectSubmission = mongoose.model('Project', proejctSubmissionSchema);

module.exports = ProjectSubmission;