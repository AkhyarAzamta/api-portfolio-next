// prisma/seed.ts
import { PrismaClient, UserRole } from '../src/generated/prisma/client';
import { hashPassword } from '../src/utils/bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...');

  // Hapus data existing (optional - hati-hati di production)
  if (process.env.NODE_ENV === 'development') {
    console.log('Cleaning existing data...');
    await prisma.contactMessage.deleteMany();
    await prisma.blog.deleteMany();
    await prisma.project.deleteMany();
    await prisma.user.deleteMany();
    await prisma.about.deleteMany();
    await prisma.skillCategory.deleteMany();
    await prisma.skill.deleteMany();
    await prisma.experience.deleteMany();
    await prisma.education.deleteMany();
    await prisma.contactInfo.deleteMany();
    await prisma.certificate.deleteMany();
    await prisma.siteSetting.deleteMany();
  }

  // Create Admin User
  const adminPassword = await hashPassword('admin123');
  const admin = await prisma.user.upsert({
    where: { email: 'admin@portfolio.com' },
    update: {},
    create: {
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

  // Create Regular User
  const userPassword = await hashPassword('user123');
  const user = await prisma.user.upsert({
    where: { email: 'user@portfolio.com' },
    update: {},
    create: {
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

  // Create About Section
  const about = await prisma.about.upsert({
    where: { id: 1 },
    update: {},
    create: {
      bio: `Saya adalah seorang Full Stack Developer dengan pengalaman lebih dari 5 tahun dalam mengembangkan aplikasi web modern. Saya memiliki passion dalam menciptakan solusi digital yang inovatif dan user-friendly.

Spesialisasi:
• Frontend: React, Next.js, TypeScript, Tailwind CSS
• Backend: Node.js, Express, Python, Django
• Database: MySQL, PostgreSQL, MongoDB
• DevOps: Docker, AWS, CI/CD

Saya selalu bersemangat untuk mempelajari teknologi baru dan berkontribusi dalam proyek-proyek yang menantang.`,
    },
  });

  // Create Skill Categories
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

  const toolsCategory = await prisma.skillCategory.create({
    data: {
      name: 'Tools & DevOps',
      icon: '🛠️',
      description: 'Development tools and deployment technologies',
    },
  });

  // Create Skills
  const skills = await prisma.skill.createMany({
    data: [
      // Frontend Skills
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
        name: 'Next.js',
        logo: '/images/skills/nextjs.png',
        categoryId: frontendCategory.id,
      },
      {
        name: 'Tailwind CSS',
        logo: '/images/skills/tailwind.png',
        categoryId: frontendCategory.id,
      },
      {
        name: 'Vue.js',
        logo: '/images/skills/vue.png',
        categoryId: frontendCategory.id,
      },
      
      // Backend Skills
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
      {
        name: 'MySQL',
        logo: '/images/skills/mysql.png',
        categoryId: backendCategory.id,
      },
      {
        name: 'PostgreSQL',
        logo: '/images/skills/postgresql.png',
        categoryId: backendCategory.id,
      },
      {
        name: 'MongoDB',
        logo: '/images/skills/mongodb.png',
        categoryId: backendCategory.id,
      },
      
      // Tools & DevOps
      {
        name: 'Docker',
        logo: '/images/skills/docker.png',
        categoryId: toolsCategory.id,
      },
      {
        name: 'Git',
        logo: '/images/skills/git.png',
        categoryId: toolsCategory.id,
      },
      {
        name: 'AWS',
        logo: '/images/skills/aws.png',
        categoryId: toolsCategory.id,
      },
      {
        name: 'Linux',
        logo: '/images/skills/linux.png',
        categoryId: toolsCategory.id,
      },
    ],
  });

  // Create Experiences
  const experiences = await prisma.experience.createMany({
    data: [
      {
        title: 'Senior Full Stack Developer',
        company: 'Tech Company Inc.',
        period: '2022 - Present',
        description: [
          'Led development of microservices architecture serving 1M+ users',
          'Implemented CI/CD pipelines reducing deployment time by 60%',
          'Mentored 5 junior developers and conducted code reviews',
          'Optimized database queries improving API response time by 40%'
        ],
      },
      {
        title: 'Full Stack Developer',
        company: 'Startup XYZ',
        period: '2020 - 2022',
        description: [
          'Developed and maintained React/Node.js web applications',
          'Collaborated with product team to implement new features',
          'Integrated third-party APIs and payment systems',
          'Improved application performance and user experience'
        ],
      },
      {
        title: 'Frontend Developer',
        company: 'Digital Agency',
        period: '2019 - 2020',
        description: [
          'Built responsive web applications using React and Vue.js',
          'Worked with design team to implement pixel-perfect UIs',
          'Participated in agile development processes',
          'Maintained and updated legacy codebases'
        ],
      },
    ],
  });

  // Create Education
  const education = await prisma.education.createMany({
    data: [
      {
        degree: 'Bachelor of Computer Science',
        institution: 'University of Technology',
        period: '2015 - 2019',
        description: 'Specialized in Software Engineering and Web Development',
        grade: 3.8,
      },
      {
        degree: 'Full Stack Web Development Bootcamp',
        institution: 'Coding Academy',
        period: '2019',
        description: 'Intensive 6-month programming bootcamp',
      },
    ],
  });

  // Create Contact Info
  const contactInfo = await prisma.contactInfo.createMany({
    data: [
      {
        type: 'email',
        value: 'hello@portfolio.com',
      },
      {
        type: 'phone',
        value: '+62 812-3456-7890',
      },
      {
        type: 'address',
        value: 'Jakarta, Indonesia',
      },
      {
        type: 'github',
        value: 'https://github.com/yourusername',
      },
      {
        type: 'linkedin',
        value: 'https://linkedin.com/in/yourusername',
      },
    ],
  });

  // Create Sample Projects
  const projects = await prisma.project.createMany({
    data: [
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
      },
      {
        title: 'Portfolio Website',
        description: 'Personal portfolio website built with modern technologies',
        technologies: ['React', 'Tailwind CSS', 'Express.js'],
        sourceCode: 'https://github.com/yourusername/portfolio',
        demoLink: 'https://myportfolio.com',
        image: '/images/projects/portfolio.jpg',
        archived: false,
      },
    ],
  });

  // Create Sample Blogs
  const blogs = await prisma.blog.createMany({
    data: [
      {
        title: 'Getting Started with Next.js 14',
        excerpt: 'Learn how to build modern web applications with Next.js 14 and new features like Server Actions.',
        content: `# Getting Started with Next.js 14

Next.js 14 brings exciting new features that make building React applications even better. In this article, we'll explore the latest updates and how you can get started.

## New Features

### Server Actions
Server Actions allow you to write server-side code that can be called directly from your React components...

### Performance Improvements
Next.js 14 includes significant performance improvements and better developer experience.

## Conclusion
Next.js continues to be the leading framework for React applications with its powerful features and excellent developer experience.`,
        authorId: admin.id,
        slug: 'getting-started-with-nextjs-14',
        published: true,
        viewCount: 150,
        tags: ['Next.js', 'React', 'Web Development'],
      },
      {
        title: 'TypeScript Best Practices for 2024',
        excerpt: 'Essential TypeScript patterns and practices every developer should know in 2024.',
        content: `# TypeScript Best Practices for 2024

TypeScript has become an essential tool for modern web development. Here are the best practices you should follow in 2024.

## 1. Strict Type Checking
Always enable strict mode in your TypeScript configuration...

## 2. Proper Interface Design
Design your interfaces to be flexible yet type-safe...

## 3. Error Handling
Implement proper error handling with TypeScript's type system...`,
        authorId: admin.id,
        slug: 'typescript-best-practices-2024',
        published: true,
        viewCount: 89,
        tags: ['TypeScript', 'Programming', 'Best Practices'],
      },
    ],
  });

  // Create Sample Contact Messages
  const contactMessages = await prisma.contactMessage.createMany({
    data: [
      {
        name: 'Alice Johnson',
        email: 'alice@example.com',
        message: 'Hello! I am interested in collaborating on a project. Can we schedule a call to discuss potential opportunities?',
        read: true,
      },
      {
        name: 'Bob Smith',
        email: 'bob@example.com',
        message: 'I saw your portfolio and I am impressed with your work. Do you offer freelance services?',
        read: false,
      },
      {
        name: 'Carol Davis',
        email: 'carol@example.com',
        message: 'Your blog post about Next.js was very helpful. Do you have any recommendations for learning advanced patterns?',
        read: true,
      },
    ],
  });

  // Create Site Settings
  const siteSettings = await prisma.siteSetting.createMany({
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
      {
        key: 'contact_email',
        value: 'contact@portfolio.com',
        type: 'email',
        category: 'contact',
        label: 'Contact Email',
        description: 'Email address for contact form submissions',
        order: 3,
      },
      {
        key: 'github_url',
        value: 'https://github.com/yourusername',
        type: 'url',
        category: 'social',
        label: 'GitHub URL',
        description: 'Your GitHub profile URL',
        order: 4,
      },
      {
        key: 'linkedin_url',
        value: 'https://linkedin.com/in/yourusername',
        type: 'url',
        category: 'social',
        label: 'LinkedIn URL',
        description: 'Your LinkedIn profile URL',
        order: 5,
      },
    ],
  });

  console.log('✅ Database seeded successfully!');
  console.log('📧 Admin Login: admin@portfolio.com / admin123');
  console.log('👤 User Login: user@portfolio.com / user123');
  console.log(`📊 Created:
    - ${(await prisma.user.findMany()).length} users
    - ${(await prisma.blog.findMany()).length} blogs
    - ${(await prisma.project.findMany()).length} projects
    - ${(await prisma.skillCategory.findMany()).length} skill categories
    - ${(await prisma.skill.findMany()).length} skills
    - ${(await prisma.experience.findMany()).length} experiences
    - ${(await prisma.contactMessage.findMany()).length} contact messages
  `);
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });