import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertReviewSchema, insertResumeSchema, insertMessageSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // API routes prefixed with /api
  
  // Get all projects
  app.get("/api/projects", async (req, res) => {
    try {
      const projects = await storage.getAllProjects();
      res.json(projects);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch projects" });
    }
  });
  
  // Get projects by category
  app.get("/api/projects/:category", async (req, res) => {
    try {
      const category = req.params.category;
      if (category === "all") {
        const projects = await storage.getAllProjects();
        res.json(projects);
      } else {
        const projects = await storage.getProjectsByCategory(category);
        res.json(projects);
      }
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch projects" });
    }
  });
  
  // Get approved reviews
  app.get("/api/reviews", async (req, res) => {
    try {
      const reviews = await storage.getApprovedReviews();
      res.json(reviews);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch reviews" });
    }
  });
  
  // Submit a review
  app.post("/api/reviews", async (req, res) => {
    try {
      const reviewData = insertReviewSchema.parse(req.body);
      const newReview = await storage.createReview(reviewData);
      res.status(201).json(newReview);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid review data", errors: error.errors });
      } else {
        res.status(500).json({ message: "Failed to submit review" });
      }
    }
  });
  
  // Submit a resume
  app.post("/api/resumes", async (req, res) => {
    try {
      const resumeData = insertResumeSchema.parse(req.body);
      const newResume = await storage.createResume(resumeData);
      res.status(201).json(newResume);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid resume data", errors: error.errors });
      } else {
        res.status(500).json({ message: "Failed to submit resume" });
      }
    }
  });
  
  // Submit a contact message
  app.post("/api/messages", async (req, res) => {
    try {
      const messageData = insertMessageSchema.parse(req.body);
      const newMessage = await storage.createMessage(messageData);
      res.status(201).json(newMessage);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid message data", errors: error.errors });
      } else {
        res.status(500).json({ message: "Failed to submit message" });
      }
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
