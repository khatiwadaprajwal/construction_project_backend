const ProjectData = require('../models/project.model');
const UserData = require('../models/user.model');

const getAllProjects = async (req, res) => {
  try {
    const projects = await ProjectData.find().populate('userId');
    res.status(200).json({ projects });
  } catch (error) {
    console.error('Error fetching projects:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


const createNewProject = async (req, res) => {
  const projectData = req.body;

  try {
    const newProject = await ProjectData.create(projectData);

    // Update the user with the new project ID
    const updatedUser = await UserData.findOneAndUpdate(
      { _id: projectData.userId },
      { $push: { projects: newProject._id } },
      { new: true }
    );

    if (!updatedUser) {
      // If the user is not found, handle accordingly
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(201).json({ message: 'Project created successfully.', project: newProject });
  } catch (error) {
    console.error('Error creating project:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getProjectById = async (req, res) => {
  const pId = req.params.pId;

  try {
    const project = await ProjectData.findOne({ projectId: pId });

    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }

    res.status(200).json({ project });
  } catch (error) {
    console.error('Error finding project by ID:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const updateProjectById = async (req, res) => {
  const upId = req.params.upId;
  const updatedProjectData = req.body;

  try {
    console.log('Update Data:', updatedProjectData);

    const result = await ProjectData.findOneAndUpdate(
      { projectId: upId },
      { $set: updatedProjectData },
      { new: true }
    ).lean();

    console.log('Result Object:', result);

    if (result) {
      res.status(200).json({ message: 'Project updated successfully.', project: result });
    } else {
      res.status(404).json({ message: 'Project not found.' });
    }
  } catch (error) {
    console.error('Error updating project by ID:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};




const deleteProjectById = async (req, res) => {
  const dId = req.params.dId;

  try {
    // Find the existing project
    const existingProject = await ProjectData.findOne({ projectId: dId });

    if (!existingProject) {
      return res.status(404).json({ message: 'Project not found.' });
    }

    // Delete the project from the user's projects array
    const updatedUser = await UserData.findOneAndUpdate(
      { _id: existingProject.userId },
      { $pull: { projects: existingProject._id } },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found.' });
    }

    // Delete the project
    const result = await ProjectData.deleteOne({ projectId: dId });

    if (result.deletedCount === 1) {
      res.status(200).json({ message: 'Project deleted successfully.' });
    } else {
      res.status(404).json({ message: 'Project not found or could not be deleted.' });
    }
  } catch (error) {
    console.error('Error deleting project by ID:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


module.exports = {
  getAllProjects,
  getProjectById,
  createNewProject,
  updateProjectById,
  deleteProjectById,
};
