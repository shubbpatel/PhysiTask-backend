const Project = require("../models/projectSubmission");

// exports.getProject = async (req, res) => {
//   try {
//     const project = await Project.findById(req.params.id);
//     res.status(200).json(project);
//   } catch (error) {
//     res.status(404).json({ message: "Project not found" });
//   }
// };

exports.updateProject = async (req, res) => {
  try {
    const updatedProject = await Project.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedProject);
  } catch (error) {
    res.status(400).json({ message: "Failed to update project" });
  }
};

// exports.deleteProject = async (req, res) => {
//   try {
//     await Project.findByIdAndDelete(req.params.id);
//     res.status(200).json({ message: "Project deleted successfully" });
//   } catch (error) {
//     res.status(400).json({ message: "Failed to delete project" });
//   }
// };
