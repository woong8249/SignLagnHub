// src/utils/centerApi.ts
import { FakeApi } from '@utils/fakeApi';
import { Center } from '@typings/Center';

export class CenterApi extends FakeApi<Center> {
  constructor() {
    super('centers');
  }
}

export const centerApi = new CenterApi();
