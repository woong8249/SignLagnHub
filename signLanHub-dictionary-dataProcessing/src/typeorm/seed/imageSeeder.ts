/* eslint-disable class-methods-use-this */
import { type Seeder, runSeeders } from 'typeorm-extension';
import { type DataSource } from 'typeorm';

import { Group } from '../entity/group';
import { Image } from '../entity/image';
import config from '../../config/config';

const { minio } = config;

interface MinIOURL {
  protocol?: string;
  baseURL?: string;
  port?: number;
  bucketName?: string;
  objectName?: string;
}

function createURL({
  protocol = minio.protocol,
  baseURL = minio.baseURL,
  port = minio.port,
  bucketName = minio.bucketName,
  objectName,
}: MinIOURL): string {
  return `${protocol}://${baseURL}:${port}/${bucketName}/${objectName}`;
}

const initialImage = [
  { objectName: 'test-logo.png', remark: '텍스트 로고' },
  { objectName: 'word.jpeg', remark: '단어' },
  { objectName: 'all.jpeg', remark: '전부' },
  { objectName: 'daily-1.jpeg', remark: '일상-1' },
  { objectName: 'daily-2.jpeg', remark: '일상-2' },
  { objectName: 'pro.jpeg', remark: '전문' },
  { objectName: 'conversation.jpeg', remark: '대화' },
  { objectName: 'official.jpeg', remark: '공식' },
  { objectName: 'various.jpeg', remark: '다양한' },
  { objectName: 'expression.jpeg', remark: '표현' },
  { objectName: 'empty.jpeg', remark: '없다' },
  { objectName: 'mean-1.jpeg', remark: '의미-1' },
  { objectName: 'mean-2.jpeg', remark: '의미-2' },
  { objectName: 'new.jpeg', remark: '새로' },
  { objectName: 'submit.jpeg', remark: '등록' },
  { objectName: 'add.jpeg', remark: '추가' },
  { objectName: 'kr-sign-lan.jpeg', remark: '한국수어' },
  { objectName: 'area.jpeg', remark: '지역' },
  { objectName: 'age.jpeg', remark: '나이' },
  { objectName: 'seoul.jpeg', remark: '서울' },
  { objectName: 'board.jpeg', remark: '게시' },
  { objectName: 'update.jpeg', remark: '수정' },
  { objectName: 'delete.jpeg', remark: '삭제' },
];

export class ImageSeeder implements Seeder {
  public async run(dataSource: DataSource) {
    const imageRepo = dataSource.getRepository(Image);
    const groupRepo = dataSource.getRepository(Group);
    const initImageGroup = await groupRepo.findOneBy({ id: 4 }) as Group;
    await imageRepo.insert(initialImage.map(({ objectName, remark }) => ({ group: initImageGroup, remark, objectUrl: createURL({ objectName }) })));
  }
}

export default async function seedImage(dataSource: DataSource) {
  const userRepo = dataSource.getRepository(Image);
  const result = await userRepo.findBy({ id: 1 });
  result.length === 0 && await runSeeders(dataSource, { seeds: [ImageSeeder] });
}
