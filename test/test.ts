import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as pactum from 'pactum'
import { PrismaService } from '../src/prisma/prisma.service';
import { AppModule } from '../src/app.module';
import { AuthDto } from 'src/auth/dto';
import { EditUserDto } from 'src/user/dto';
import { CreateBookmarkDto, EditBookmarkDto } from 'src/bookmark/dto';

describe('App e2e', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  beforeAll(async() => {
    const moduleRef = 
      await Test.createTestingModule({
        imports: [AppModule],
      }).compile();
    app = moduleRef.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
      }),
    );
    await app.init();
    await app.listen(3333);

    prisma = app.get(PrismaService);
    await prisma.cleanDb();
    pactum.request.setBaseUrl('http://localhost:3333')
  });

  afterAll(() => {
    app.close();
  });
  describe('Auth', () => {
    const dto: AuthDto ={
      email: 'joohny_2014@hotmail.com',
      password: '123',
    }
    describe('Signup', () => {
      it('should signup', () => {
        return pactum
          .spec()
          .post(
            '/auth/signup'
          ).withBody(dto)
          .expectStatus(201)
      });
      it('should throw if email empty', () => {
        return pactum
        .spec()
        .post(
          '/auth/signup'
        ).withBody({
          password: dto.password 
        })
        .expectStatus(400)
      })
      it('should throw if password empty', () => {
        return pactum
        .spec()
        .post(
          '/auth/signup'
        ).withBody({
          email: dto.email 
        })
        .expectStatus(400)
      })
      it('should throw if no body provided', () => {
        return pactum
        .spec()
        .post(
          '/auth/signup'
        )
        .expectStatus(400)
      })
    });

    describe('Signin', () => {
      it('should throw if email empty', () => {
        return pactum
        .spec()
        .post(
          '/auth/signin'
        ).withBody({
          password: dto.password 
        })
        .expectStatus(400)
      })
      it('should throw if password empty', () => {
        return pactum
        .spec()
        .post(
          '/auth/signin'
        ).withBody({
          email: dto.email 
        })
        .expectStatus(400)
      })
      it('should throw if no body provided', () => {
        return pactum
        .spec()
        .post(
          '/auth/signin'
        )
        .expectStatus(400)
      })
      it('should signin', () => {
        return pactum
        .spec()
        .post(
          '/auth/signin'
        ).withBody(dto)
        .expectStatus(200)
        .stores('userAt', 'access_token')
      });
    });
  });

  describe('User', () => {
    describe('Get me', () => {
      it('should get current user', () => {
        return pactum
        .spec()
        .get(
          '/users/me'
        )
        .withHeaders({
          Authorization: 'Bearer $S{userAt}'
        })
        .expectStatus(200)
      })
    });
    describe('Edit', () => {
      it('should edit user', () => {
        const dto: EditUserDto = {
          firstName: "Joohny",
          email: "joohny_2010@hotmail.com",
        }
        return pactum
        .spec()
        .patch(
          '/users'
        )
        .withHeaders({
          Authorization: 'Bearer $S{userAt}'
        })
        .expectStatus(200)
        .withBody(dto)
        .expectBodyContains(dto.firstName)
        .expectBodyContains(dto.email);
      })
    });
  });
    
  describe('Bookmarks', () => {

    describe('Get empty bookmarks', () => {
      it('should get empty bookmarks', () => {
        return pactum
          .spec()
          .get('/bookmarks')
          .withHeaders({
            Authorization: 'Bearer $S{userAt}'
          })
          .expectStatus(200)
          .expectBody([]);
      });
    });
      
      describe('Create Bookmarks', () => {
        const dto: CreateBookmarkDto = {
          title: "First bookmarks",
          link: "https://www.youtube.com/watch?v=GHTA143_b-s",
        }
        it('should create bookmark', () => {
          return pactum
            .spec()
            .post('/bookmarks')
            .withBody(dto)
            .withHeaders({
              Authorization: 'Bearer $S{userAt}'
            })
            .expectStatus(201)
            .stores('bookmarkId', 'id');
        })
      });
      
      describe('Get bookmarks', () => {
        it('should get  bookmarks', () => {
          return pactum
            .spec()
            .get('/bookmarks')
            .withHeaders({
              Authorization: 'Bearer $S{userAt}'
            })
            .expectStatus(200)
            .expectJsonLength(1);
        });
      });
      
      describe('Get bookmark by id', () => {
        it('should get  bookmark by id', () => {
          return pactum
            .spec()
            .get('/bookmarks/{id}')
            .withPathParams('id', '$S{bookmarkId}')
            .withHeaders({
              Authorization: 'Bearer $S{userAt}'
            })
            .expectStatus(200)
            .expectBodyContains('$S{bookmarkId}');
        });
      });
      
      describe('Edit bookmark by id', () => {
        const dto: EditBookmarkDto = {
          title: 'An awesome video',
          description: 'Learn NEST IN ONE VIDEO',
        };
        it('should edit bookmark', () => {
          return pactum
            .spec()
            .patch('/bookmarks/{id}')
            .withPathParams('id', '$S{bookmarkId}')
            .withHeaders({
              Authorization: 'Bearer $S{userAt}'
            })
            .withBody(dto)
            .expectStatus(200)
            .expectBodyContains(dto.title)
            .expectBodyContains(dto.description);
        });
      });
    
      describe('Delete bookmark by id', () => {
        it('should delete bookmark', () => {
          return pactum
            .spec()
            .delete('/bookmarks/{id}')
            .withPathParams('id', '$S{bookmarkId}')
            .withHeaders({
              Authorization: 'Bearer $S{userAt}'
            })
            .expectStatus(204);

        });
        it('should get empty bookmarks', () => {
          return pactum
          .spec()
          .get('/bookmarks')
          .withHeaders({
            Authorization: 'Bearer $S{userAt}'
          })
          .expectStatus(200)
          .expectJsonLength(0);
        })
      });
  });
})