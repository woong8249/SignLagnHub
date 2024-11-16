/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-param-reassign */
/* eslint-disable no-restricted-globals */
/* eslint-disable no-restricted-syntax */
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
    return data.map((item: T) => this.parseDates(item)) as T[];
  }

  getById(id: number): T | undefined {
    const data = this.getAll();
    return data.find((item) => item.id === id);
  }

  private parseDates(item: any): any {
    if (typeof item === 'object' && item !== null) {
      for (const key in item) {
        if (typeof item[key] === 'string' && !isNaN(Date.parse(item[key]))) {
          item[key] = new Date(item[key]); // 문자열 -> Date 변환
        } else if (typeof item[key] === 'object') {
          this.parseDates(item[key]); // 재귀 호출로 중첩된 객체 처리
        }
      }
    }
    return item;
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
