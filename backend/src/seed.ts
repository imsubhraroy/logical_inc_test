import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const sampleData = [
  {
    title: 'The Shawshank Redemption',
    type: 'MOVIE' as const,
    director: 'Frank Darabont',
    budget: 25000000,
    location: 'Ohio, USA',
    duration: 142,
    year: 1994,
    description: 'Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.',
    imageUrl: 'https://m.media-amazon.com/images/M/MV5BNDE3ODcxYzMtY2YzZC00NmNlLWJiNDMtZDViZWM2MzIxZDYwXkEyXkFqcGdeQXVyNjAwNDUxODI@._V1_.jpg'
  },
  {
    title: 'Breaking Bad',
    type: 'TV_SHOW' as const,
    director: 'Vince Gilligan',
    budget: 3000000,
    location: 'Albuquerque, New Mexico',
    duration: 47,
    year: 2008,
    description: 'A high school chemistry teacher turned methamphetamine manufacturer partners with a former student.',
    imageUrl: 'https://m.media-amazon.com/images/M/MV5BYmQ4YWMxYjUtNjZmYi00MDQ1LWFjMjMtNjA5ZDdiYjdiODU5XkEyXkFqcGdeQXVyMTMzNDExODE5._V1_.jpg'
  },
  {
    title: 'The Dark Knight',
    type: 'MOVIE' as const,
    director: 'Christopher Nolan',
    budget: 185000000,
    location: 'Chicago, Illinois',
    duration: 152,
    year: 2008,
    description: 'When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests.',
    imageUrl: 'https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_.jpg'
  },
  {
    title: 'Stranger Things',
    type: 'TV_SHOW' as const,
    director: 'The Duffer Brothers',
    budget: 8000000,
    location: 'Atlanta, Georgia',
    duration: 51,
    year: 2016,
    description: 'When a young boy disappears, his mother, a police chief and his friends must confront terrifying supernatural forces.',
    imageUrl: 'https://m.media-amazon.com/images/M/MV5BN2ZmYjg1YmItNWQ4OC00YWM0LWE0ZDktYThjOTZiZjhhN2Q2XkEyXkFqcGdeQXVyNjgxNTQ3Mjk@._V1_.jpg'
  },
  {
    title: 'Inception',
    type: 'MOVIE' as const,
    director: 'Christopher Nolan',
    budget: 160000000,
    location: 'Los Angeles, California',
    duration: 148,
    year: 2010,
    description: 'A thief who steals corporate secrets through dream-sharing technology is given the inverse task of planting an idea.',
    imageUrl: 'https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_.jpg'
  },
  {
    title: 'Game of Thrones',
    type: 'TV_SHOW' as const,
    director: 'David Benioff & D.B. Weiss',
    budget: 10000000,
    location: 'Northern Ireland, Iceland',
    duration: 57,
    year: 2011,
    description: 'Nine noble families fight for control over the lands of Westeros, while an ancient enemy returns.',
    imageUrl: 'https://m.media-amazon.com/images/M/MV5BN2IzYzBiOTQtNGZmMi00NDI5LTgxMzMtN2EzZjA1NjhlOGMxXkEyXkFqcGdeQXVyNjAwNDUxODI@._V1_.jpg'
  },
  {
    title: 'Pulp Fiction',
    type: 'MOVIE' as const,
    director: 'Quentin Tarantino',
    budget: 8000000,
    location: 'Los Angeles, California',
    duration: 154,
    year: 1994,
    description: 'The lives of two mob hitmen, a boxer, a gangster and his wife intertwine in four tales of violence and redemption.',
    imageUrl: 'https://m.media-amazon.com/images/M/MV5BNGNhMDIzZTUtNTBlZi00MTRlLWFjM2ItYzViMjE3YzI5MjljXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg'
  },
  {
    title: 'The Office',
    type: 'TV_SHOW' as const,
    director: 'Greg Daniels',
    budget: 2000000,
    location: 'Los Angeles, California',
    duration: 22,
    year: 2005,
    description: 'A mockumentary on a group of typical office workers, where the workday consists of ego clashes and inappropriate behavior.',
    imageUrl: 'https://m.media-amazon.com/images/M/MV5BMDNkOTE4NDQtMTNmYi00MWE0LWE4MTgtYzU3MjNkMGU5NjQxXkEyXkFqcGdeQXVyMzQ2MDI5NjU@._V1_.jpg'
  },
  {
    title: 'The Godfather',
    type: 'MOVIE' as const,
    director: 'Francis Ford Coppola',
    budget: 6000000,
    location: 'New York City, New York',
    duration: 175,
    year: 1972,
    description: 'The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.',
    imageUrl: 'https://m.media-amazon.com/images/M/MV5BM2MyNjYxNmUtYTAwNi00MTYxLWJmNWYtYzZlODY3ZTk3OTFlXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg'
  },
  {
    title: 'The Crown',
    type: 'TV_SHOW' as const,
    director: 'Peter Morgan',
    budget: 13000000,
    location: 'London, United Kingdom',
    duration: 58,
    year: 2016,
    description: 'Follows the political rivalries and romance of Queen Elizabeth II\'s reign and the events that shaped the second half of the 20th century.',
    imageUrl: 'https://m.media-amazon.com/images/M/MV5BZmY0MzBlNjctOTFjZS00YzI3LWFkN2MtNjJlMmRhYjNlZWVmXkEyXkFqcGdeQXVyMTUzMTg2ODkz._V1_.jpg'
  }
];

async function main() {
  console.log('🌱 Starting seed...');

  for (const item of sampleData) {
    await prisma.media.create({
      data: item
    });
  }

  console.log('✅ Seed completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });