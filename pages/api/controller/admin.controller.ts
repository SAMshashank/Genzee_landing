import express, { Request, Response } from "express";
import Dashboard from "../schema/Dashboard.model";


const adminRouter = express.Router();

adminRouter.post("/dashboard", async (req: Request, res: Response) => {
  console.log("Received POST request to /dashboard");

  try {
    const { title, metadata } = req.body;
    console.log("Request payload:", { title, metadata });

    if (!title) {
      console.error("Validation Error: Title is required");
      return res.status(400).json({ error: "Title is required" });
    }

    // Log finding dashboard by title
    console.log(`Checking if dashboard with title '${title}' exists...`);
    const existingDashboard = await Dashboard.findOne({ title });

    if (existingDashboard) {
      console.log(`Dashboard with title '${title}' found. Updating metadata...`);

      // Update metadata and save
      existingDashboard.metadata = metadata || existingDashboard.metadata;
      existingDashboard.updatedAt = new Date();
      await existingDashboard.save();

      console.log(`Dashboard with title '${title}' updated successfully.`);
      return res.status(200).json({
        message: "Dashboard updated successfully",
        dashboard: existingDashboard,
      });
    }

    console.log(`Dashboard with title '${title}' not found. Creating a new dashboard...`);

    // Create a new dashboard entry
    const newDashboard = new Dashboard({
      title,
      metadata,
    });

    await newDashboard.save();
    console.log(`Dashboard with title '${title}' created successfully.`);

    res.status(201).json({
      message: "Dashboard created successfully",
      dashboard: newDashboard,
    });
  } catch (error:any) {
    console.error("Error occurred in /dashboard API:", error);

    res.status(500).json({
      error: "An error occurred while processing your request",
      details: error?.message,
    });
  }
});


adminRouter.get("/dashboard", async (req: Request, res: Response) => {
    const { title } = req.query;
  
    if (!title || typeof title !== 'string') {
      return res.status(400).json({ error: "Title is required and should be a string" });
    }
  
    try {
      const dashboard = await Dashboard.findOne({ title });
  
      if (!dashboard) {
        // Return empty array if dashboard with the given title is not found
        return res.status(200).json({ metadata: [] });
      }
  
      // Return metadata of the found dashboard
      return res.status(200).json({ metadata: dashboard.metadata,visibility: dashboard.visibility });
    } catch (error:any) {
      console.error("Error occurred in /dashboard API:", error);
      return res.status(500).json({
        error: "An error occurred while processing your request",
        details: error.message,
      });
    }
  });

export default adminRouter;
