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
        title: 'E-commerce Platform',
        description: 'Modern e-commerce solution with integrated payment gateways and inventory management.',
        category: 'web',
        imageUrl: 'https://images.unsplash.com/photo-1547658719-da2b51169166',
        tags: ['React', 'Node.js', 'MongoDB'],
        liveUrl: 'https://example.com',
        codeUrl: 'https://github.com'
      },
      {
        title: 'Fitness Tracker App',
        description: 'Comprehensive fitness tracking application with workout plans and progress monitoring.',
        category: 'app',
        imageUrl: 'https://images.unsplash.com/photo-1551650975-87deedd944c3',
        tags: ['React Native', 'Firebase', 'Redux'],
        liveUrl: 'https://appstore.com',
        codeUrl: 'https://playstore.com'
      },
      {
        title: 'Tech Startup Branding',
        description: 'Complete brand identity package including logo, color palette, typography, and brand guidelines.',
        category: 'graphic',
        imageUrl: 'https://images.unsplash.com/photo-1626785774573-4b799315345d',
        tags: ['Logo Design', 'Brand Identity', 'Style Guide'],
        liveUrl: 'https://behance.com'
      },
      {
        title: 'Music Festival Poster',
        description: 'Event poster design for an annual music festival featuring vibrant colors and custom typography.',
        category: 'poster',
        imageUrl: 'https://images.unsplash.com/photo-1561070791-2526d30994b5',
        tags: ['Poster Design', 'Typography', 'Adobe Illustrator'],
        liveUrl: 'https://dribbble.com'
      },
      {
        title: 'Analytics Dashboard',
        description: 'Real-time analytics dashboard with customizable widgets and data visualization tools.',
        category: 'web',
        imageUrl: 'https://images.unsplash.com/photo-1561070791-36c11767b26a',
        tags: ['Vue.js', 'D3.js', 'Express'],
        liveUrl: 'https://example.com/dashboard',
        codeUrl: 'https://github.com/dashboard'
      },
      {
        title: 'Food Delivery App',
        description: 'On-demand food delivery application with real-time order tracking and restaurant discovery.',
        category: 'app',
        imageUrl: 'https://images.unsplash.com/photo-1555774698-0b77e0d5fac6',
        tags: ['Flutter', 'Firebase', 'Google Maps API'],
        liveUrl: 'https://appstore.com/foodapp',
        codeUrl: 'https://playstore.com/foodapp'
      }
    ];
    
    sampleProjects.forEach(project => {
      this.createProject(project);
    });
    
    // Add some approved reviews
    const sampleReviews: InsertReview[] = [
      {
        name: "Sarah Johnson",
        email: "sarah@example.com",
        company: "TechStart",
        rating: 5,
        comment: "Alex delivered an exceptional e-commerce platform that exceeded our expectations. The attention to detail and innovative features have significantly improved our online sales. Highly recommended!",
        projectType: "web",
      },
      {
        name: "Michael Thompson",
        email: "michael@example.com",
        company: "FitLife",
        rating: 5,
        comment: "The fitness tracking app Alex developed for us has received amazing feedback from our users. The intuitive UI and robust backend have made it our most successful digital product to date.",
        projectType: "app",
      },
      {
        name: "Emma Davis",
        email: "emma@example.com",
        company: "Creative Minds",
        rating: 4,
        comment: "Alex's branding work completely transformed our company's image. The logo design and brand guidelines have given us a cohesive identity that resonates with our target audience.",
        projectType: "graphic",
      }
    ];
    
    sampleReviews.forEach(async (review) => {
      const newReview = await this.createReview(review);
      await this.approveReview(newReview.id);
    });
  }
}

export const storage = new MemStorage();
