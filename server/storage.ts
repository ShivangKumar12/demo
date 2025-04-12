import { 
  users, type User, type InsertUser,
  projects, type Project, type InsertProject,
  reviews, type Review, type InsertReview,
  resumes, type Resume, type InsertResume,
  messages, type Message, type InsertMessage
} from "@shared/schema";

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Project operations
  getAllProjects(): Promise<Project[]>;
  getProjectsByCategory(category: string): Promise<Project[]>;
  createProject(project: InsertProject): Promise<Project>;
  
  // Review operations
  getApprovedReviews(): Promise<Review[]>;
  createReview(review: InsertReview): Promise<Review>;
  approveReview(id: number): Promise<Review>;
  
  // Resume operations
  getAllResumes(): Promise<Resume[]>;
  createResume(resume: InsertResume): Promise<Resume>;
  
  // Message operations
  getAllMessages(): Promise<Message[]>;
  createMessage(message: InsertMessage): Promise<Message>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private projects: Map<number, Project>;
  private reviews: Map<number, Review>;
  private resumes: Map<number, Resume>;
  private messages: Map<number, Message>;
  
  currentUserId: number;
  currentProjectId: number;
  currentReviewId: number;
  currentResumeId: number;
  currentMessageId: number;

  constructor() {
    this.users = new Map();
    this.projects = new Map();
    this.reviews = new Map();
    this.resumes = new Map();
    this.messages = new Map();
    
    this.currentUserId = 1;
    this.currentProjectId = 1;
    this.currentReviewId = 1;
    this.currentResumeId = 1;
    this.currentMessageId = 1;
    
    // Add sample projects
    this.seedProjects();
  }

  // User operations
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
  
  // Project operations
  async getAllProjects(): Promise<Project[]> {
    return Array.from(this.projects.values());
  }
  
  async getProjectsByCategory(category: string): Promise<Project[]> {
    return Array.from(this.projects.values()).filter(
      (project) => project.category === category
    );
  }
  
  async createProject(insertProject: InsertProject): Promise<Project> {
    const id = this.currentProjectId++;
    const project: Project = { ...insertProject, id };
    this.projects.set(id, project);
    return project;
  }
  
  // Review operations
  async getApprovedReviews(): Promise<Review[]> {
    return Array.from(this.reviews.values()).filter(
      (review) => review.approved
    );
  }
  
  async createReview(insertReview: InsertReview): Promise<Review> {
    const id = this.currentReviewId++;
    const createdAt = new Date();
    const approved = false; // All reviews start as unapproved
    const review: Review = { ...insertReview, id, createdAt, approved };
    this.reviews.set(id, review);
    return review;
  }
  
  async approveReview(id: number): Promise<Review> {
    const review = this.reviews.get(id);
    if (!review) {
      throw new Error(`Review with id ${id} not found`);
    }
    
    const updatedReview: Review = { ...review, approved: true };
    this.reviews.set(id, updatedReview);
    return updatedReview;
  }
  
  // Resume operations
  async getAllResumes(): Promise<Resume[]> {
    return Array.from(this.resumes.values());
  }
  
  async createResume(insertResume: InsertResume): Promise<Resume> {
    const id = this.currentResumeId++;
    const createdAt = new Date();
    const resume: Resume = { ...insertResume, id, createdAt };
    this.resumes.set(id, resume);
    return resume;
  }
  
  // Message operations
  async getAllMessages(): Promise<Message[]> {
    return Array.from(this.messages.values());
  }
  
  async createMessage(insertMessage: InsertMessage): Promise<Message> {
    const id = this.currentMessageId++;
    const createdAt = new Date();
    const message: Message = { ...insertMessage, id, createdAt };
    this.messages.set(id, message);
    return message;
  }
  
  // Seed sample projects data
  private seedProjects() {
    const sampleProjects: InsertProject[] = [
      {
        title: 'Parking Management System',
        description: 'Developed a real-time smart parking system for digital vehicle slot management and tracking. Created responsive frontend in React.js and connected it with Express.js and MongoDB for efficient backend data flow.',
        category: 'web',
        imageUrl: 'https://images.unsplash.com/photo-1573348722427-f1d6819fdf98',
        tags: ['React', 'Express', 'MongoDB'],
        liveUrl: 'https://example.com',
        codeUrl: 'https://github.com'
      },
      {
        title: 'Hand Gesture Recognition',
        description: 'An experimental BTech project exploring computer vision and gesture inputs for automation and accessibility use-cases.',
        category: 'app',
        imageUrl: 'https://images.unsplash.com/photo-1590845947376-2638caa89309',
        tags: ['Computer Vision', 'ML', 'Python'],
        liveUrl: null,
        codeUrl: null
      },
      {
        title: 'College Website Backend',
        description: 'As a web development intern, I helped develop and maintain the backend of the college website, improving data flow, authentication, and integration with frontend modules.',
        category: 'web',
        imageUrl: 'https://images.unsplash.com/photo-1577985051167-0d49eec21977',
        tags: ['Node.js', 'Express', 'Firebase', 'MongoDB'],
        liveUrl: null,
        codeUrl: null
      },
      {
        title: 'Portfolio Design',
        description: 'Created modern and clean portfolio design with interactive elements and responsive layout.',
        category: 'poster',
        imageUrl: 'https://images.unsplash.com/photo-1561070791-2526d30994b5',
        tags: ['Design', 'Figma', 'UI/UX'],
        liveUrl: 'https://dribbble.com',
        codeUrl: null
      },
      {
        title: 'E-commerce Platform',
        description: 'Modern e-commerce solution with integrated payment gateways and inventory management.',
        category: 'web',
        imageUrl: 'https://images.unsplash.com/photo-1561070791-36c11767b26a',
        tags: ['React', 'Node.js', 'Express'],
        liveUrl: 'https://example.com/dashboard',
        codeUrl: 'https://github.com/dashboard'
      },
      {
        title: 'React Native Mobile App',
        description: 'Mobile application with user authentication, data persistence, and responsive UI.',
        category: 'app',
        imageUrl: 'https://images.unsplash.com/photo-1555774698-0b77e0d5fac6',
        tags: ['React Native', 'Firebase', 'Redux'],
        liveUrl: 'https://appstore.com/app',
        codeUrl: 'https://github.com/app'
      }
    ];
    
    sampleProjects.forEach(project => {
      this.createProject(project);
    });
    
    // Add a note about being new to freelancing - one placeholder review
    const sampleReviews: InsertReview[] = [
      {
        name: "Portfolio Note",
        email: "info@example.com",
        company: "Chandigarh Engineering College",
        rating: 5,
        comment: "New to freelancing! This section will soon feature real client testimonials as I begin working on more projects. My academic work and internship received positive feedback for clean code and effective problem-solving.",
        projectType: "web"
      }
    ];
    
    sampleReviews.forEach(async (review) => {
      const newReview = await this.createReview(review);
      await this.approveReview(newReview.id);
    });
  }
}

export const storage = new MemStorage();
