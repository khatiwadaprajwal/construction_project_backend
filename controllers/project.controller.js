const Project = require('../models/project.model');

const getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find();
    res.status(200).json({ projects });
  } catch (error) {
    console.error('Error fetching projects:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getProjectById = async (req, res) => {
  const pId = req.params.pId;

  try {
    const project = await Project.findOne({ projectId: pId });

    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }

    res.status(200).json({ project });
  } catch (error) {
    console.error('Error finding project by ID:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const createNewProject = async (req, res) => {
    const projectData = req.body;
  
    try {
      console.log(projectData); // Check the output in your console
      const newProject = await Project.create(projectData);
      res.status(201).json({ message: 'Project created successfully.', project: newProject });
    } catch (error) {
      console.error('Error creating project:', error.message);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

const updateProjectById = async (req, res) => {
  const upId = req.params.upId;
  const updatedProjectData = req.body;

  try {
    const result = await Project.findOneAndUpdate({ projectId: upId }, { $set: updatedProjectData }, { new: true });

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
    const result = await Project.deleteOne({ projectId: dId });

    if (result.deletedCount === 1) {
      res.status(200).json({ message: 'Project deleted successfully.' });
    } else {
      res.status(404).json({ message: 'Project not found or could not be deleted.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error deleting project by ID:', message: error.message });
  }
};

module.exports = {
  getAllProjects,
  getProjectById,
  createNewProject,
  updateProjectById,
  deleteProjectById,
};

