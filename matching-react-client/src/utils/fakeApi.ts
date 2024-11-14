// src/utils/fakeApi.ts
export abstract class FakeApi<T extends { id: number }> {
  private storageKey: string;

  constructor(storageKey: string) {
    this.storageKey = storageKey;
    if (!localStorage.getItem(storageKey)) {
      localStorage.setItem(storageKey, JSON.stringify([]));
    }
  }

  async getAll(): Promise<T[]> {
    const data = JSON.parse(localStorage.getItem(this.storageKey) || '[]');
    return data as T[];
  }

  async getById(id: number): Promise<T | undefined> {
    const data = await this.getAll();
    return data.find((item) => item.id === id);
  }

  async create(newItem: Omit<T, 'id'>): Promise<T> {
    const data = await this.getAll();
    // 새로운 ID 생성: 마지막 ID + 1 또는 1
    const newId = data.length ? data[data.length - 1].id + 1 : 1;
    const itemWithId = { ...newItem, id: newId } as T;
    data.push(itemWithId);
    // 로컬 스토리지 업데이트
    localStorage.setItem(this.storageKey, JSON.stringify(data));
    return itemWithId;
  }

  async update(id: number, updatedItem: Partial<T>): Promise<T> {
    const data = await this.getAll();
    const index = data.findIndex((item) => item.id === id);

    if (index === -1) {
      throw new Error(`Item with id ${id} not found`);
    }

    data[index] = { ...data[index], ...updatedItem };
    localStorage.setItem(this.storageKey, JSON.stringify(data));

    return data[index];
  }

  async delete(id: number): Promise<number> {
    const data = await this.getAll();
    const index = data.findIndex((item) => item.id === id);

    if (index === -1) {
      throw new Error(`Item with id ${id} not found`);
    }

    data.splice(index, 1); // 해당 인덱스의 항목 제거
    localStorage.setItem(this.storageKey, JSON.stringify(data));

    return id;
  }
}
