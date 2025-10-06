// prisma/seed.ts
import { PrismaClient, UserRole } from '@prisma/client';
import { hashPassword } from '../src/utils/bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...');

  // Hapus data existing dengan urutan yang benar (hindari foreign key constraints)
  console.log('Cleaning existing data...');
  
  await prisma.blog.deleteMany();
  await prisma.project.deleteMany();
  await prisma.contactMessage.deleteMany();
  await prisma.skill.deleteMany();
  await prisma.skillCategory.deleteMany();
  await prisma.experience.deleteMany();
  await prisma.education.deleteMany();
  await prisma.contactInfo.deleteMany();
  await prisma.certificate.deleteMany();
  await prisma.siteSetting.deleteMany();
  await prisma.about.deleteMany();
  await prisma.user.deleteMany();

  // Create Users
  console.log('Creating users...');
  const adminPassword = await hashPassword('admin123');
  const userPassword = await hashPassword('user123');

  const admin = await prisma.user.create({
    data: {
      name: 'Administrator',
      email: 'admin@portfolio.com',
      password: adminPassword,
      role: UserRole.ADMIN,
      title: 'Full Stack Developer',
      bio: 'Experienced full stack developer with passion for creating amazing web applications.',
      avatar: '/images/avatar.jpg',
      githubUrl: 'https://github.com/admin',
      linkedinUrl: 'https://linkedin.com/in/admin',
      instagramUrl: 'https://instagram.com/admin',
    },
  });

  const user = await prisma.user.create({
    data: {
      name: 'John Doe',
      email: 'user@portfolio.com',
      password: userPassword,
      role: UserRole.USER,
      title: 'Frontend Developer',
      bio: 'Passionate frontend developer specializing in React and TypeScript.',
      avatar: '/images/user-avatar.jpg',
      githubUrl: 'https://github.com/johndoe',
    },
  });

  // Create Blogs dengan slug yang unique
  console.log('Creating blogs...');
  const blogs = [
    {
      title: 'Getting Started with Next.js 14',
      excerpt: 'Learn how to build modern web applications with Next.js 14 and new features like Server Actions.',
      content: `# Getting Started with Next.js 14\n\nNext.js 14 brings exciting new features...`,
      authorId: admin.id,
      slug: 'getting-started-with-nextjs-14-' + Date.now(), // Tambah timestamp untuk uniqueness
      published: true,
      viewCount: 150,
      tags: ['Next.js', 'React', 'Web Development'],
    },
    {
      title: 'TypeScript Best Practices for 2024',
      excerpt: 'Essential TypeScript patterns and practices every developer should know in 2024.',
      content: `# TypeScript Best Practices for 2024\n\nTypeScript has become an essential tool...`,
      authorId: admin.id,
      slug: 'typescript-best-practices-2024-' + Date.now(),
      published: true,
      viewCount: 89,
      tags: ['TypeScript', 'Programming', 'Best Practices'],
    },
    {
      title: 'Building RESTful APIs with Node.js',
      excerpt: 'Complete guide to building RESTful APIs using Node.js, Express and TypeScript.',
      content: `# Building RESTful APIs with Node.js\n\nRESTful APIs are the backbone of modern web applications...`,
      authorId: admin.id,
      slug: 'building-restful-apis-nodejs-' + Date.now(),
      published: true,
      viewCount: 200,
      tags: ['Node.js', 'API', 'Backend'],
    }
  ];

  for (const blog of blogs) {
    await prisma.blog.create({
      data: blog,
    });
  }

  // Create Projects
  console.log('Creating projects...');
  const projects = [
    {
      title: 'E-Commerce Platform',
      description: 'Full-stack e-commerce solution with React, Node.js, and MySQL',
      technologies: ['React', 'Node.js', 'MySQL', 'Stripe', 'AWS'],
      sourceCode: 'https://github.com/yourusername/ecommerce-platform',
      demoLink: 'https://ecommerce-demo.com',
      image: '/images/projects/ecommerce.jpg',
      githubLink: 'https://github.com/yourusername/ecommerce-platform',
      env: 'Production',
    },
    {
      title: 'Task Management App',
      description: 'Collaborative task management application with real-time updates',
      technologies: ['Next.js', 'TypeScript', 'Socket.io', 'MongoDB'],
      sourceCode: 'https://github.com/yourusername/task-app',
      demoLink: 'https://taskapp-demo.com',
      image: '/images/projects/taskapp.jpg',
      githubLink: 'https://github.com/yourusername/task-app',
      price: 0,
      env: 'Development',
    }
  ];

  for (const project of projects) {
    await prisma.project.create({
      data: project,
    });
  }

  // Create About Section
  console.log('Creating about section...');
  await prisma.about.create({
    data: {
      bio: `I am a passionate Full Stack Developer with expertise in modern web technologies. I love creating efficient, scalable, and user-friendly applications.

My skills include:
• Frontend: React, Next.js, TypeScript, Tailwind CSS
• Backend: Node.js, Express, Python, Django
• Database: MySQL, PostgreSQL, MongoDB
• DevOps: Docker, AWS, CI/CD

I'm always excited to learn new technologies and contribute to challenging projects.`
    },
  });

  // Create Skill Categories and Skills
  console.log('Creating skills...');
  const frontendCategory = await prisma.skillCategory.create({
    data: {
      name: 'Frontend Development',
      icon: '💻',
      description: 'Technologies for building user interfaces',
    },
  });

  const backendCategory = await prisma.skillCategory.create({
    data: {
      name: 'Backend Development',
      icon: '⚙️',
      description: 'Server-side technologies and frameworks',
    },
  });

  await prisma.skill.createMany({
    data: [
      {
        name: 'React',
        logo: '/images/skills/react.png',
        categoryId: frontendCategory.id,
      },
      {
        name: 'TypeScript',
        logo: '/images/skills/typescript.png',
        categoryId: frontendCategory.id,
      },
      {
        name: 'Node.js',
        logo: '/images/skills/nodejs.png',
        categoryId: backendCategory.id,
      },
      {
        name: 'Express.js',
        logo: '/images/skills/express.png',
        categoryId: backendCategory.id,
      },
    ],
  });

  // Create Experiences
  console.log('Creating experiences...');
  await prisma.experience.createMany({
    data: [
      {
        title: 'Senior Full Stack Developer',
        company: 'Tech Company Inc.',
        period: '2022 - Present',
        description: ['Led development of microservices architecture', 'Implemented CI/CD pipelines', 'Mentored junior developers'],
      },
      {
        title: 'Full Stack Developer',
        company: 'Startup XYZ',
        period: '2020 - 2022',
        description: ['Developed React/Node.js applications', 'Integrated third-party APIs'],
      },
    ],
  });

  // Create Contact Messages
  console.log('Creating contact messages...');
  await prisma.contactMessage.createMany({
    data: [
      {
        name: 'Alice Johnson',
        email: 'alice@example.com',
        message: 'Interested in collaborating on a project.',
        read: true,
      },
      {
        name: 'Bob Smith',
        email: 'bob@example.com',
        message: 'Impressed with your portfolio work.',
        read: false,
      },
    ],
  });

  // Create Site Settings
  console.log('Creating site settings...');
  await prisma.siteSetting.createMany({
    data: [
      {
        key: 'site_title',
        value: 'My Portfolio',
        type: 'text',
        category: 'general',
        label: 'Site Title',
        description: 'The main title of your website',
        order: 1,
      },
      {
        key: 'site_description',
        value: 'Personal portfolio showcasing my projects and skills',
        type: 'textarea',
        category: 'general',
        label: 'Site Description',
        description: 'Brief description of your website',
        order: 2,
      },
    ],
  });

  console.log('✅ Database seeded successfully!');
  console.log('📧 Admin Login: admin@portfolio.com / admin123');
  console.log('👤 User Login: user@portfolio.com / user123');
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });