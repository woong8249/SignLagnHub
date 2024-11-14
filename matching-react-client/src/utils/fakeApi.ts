// src/utils/fakeApi.ts
export abstract class FakeApi<T extends { id: number }> {
  private storageKey: string;

  constructor(storageKey: string) {
    this.storageKey = storageKey;
    if (!localStorage.getItem(storageKey)) {
      localStorage.setItem(this.storageKey, JSON.stringify([]));
    }
  }

  getAll(): T[] {
    const data = JSON.parse(localStorage.getItem(this.storageKey) || '[]');
    return data as T[];
  }

  getById(id: number): T | undefined {
    const data = this.getAll();
    return data.find((item) => item.id === id);
  }

  create(newItem: Omit<T, 'id'>): T {
    const data = this.getAll();
    const newId = data.length ? data[data.length - 1].id + 1 : 1;
    const itemWithId = { ...newItem, id: newId } as T;
    data.push(itemWithId);
    localStorage.setItem(this.storageKey, JSON.stringify(data));
    return itemWithId;
  }

  update(id: number, updatedItem: Partial<T>): T {
    const data = this.getAll();
    const index = data.findIndex((item) => item.id === id);

    if (index === -1) {
      throw new Error(`Item with id ${id} not found`);
    }

    data[index] = { ...data[index], ...updatedItem };
    localStorage.setItem(this.storageKey, JSON.stringify(data));
    return data[index];
  }

  delete(id: number): number {
    const data = this.getAll();
    const index = data.findIndex((item) => item.id === id);

    if (index === -1) {
      throw new Error(`Item with id ${id} not found`);
    }

    data.splice(index, 1);
    localStorage.setItem(this.storageKey, JSON.stringify(data));
    return id;
  }
}
