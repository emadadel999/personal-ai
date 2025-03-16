

export function loadData(name: string) : unknown | null {
  if (!name) return null;

  const data = localStorage.getItem(name);

  if (!data) return null;
  try {
    return JSON.parse(data);
  } catch (error) {
    console.error(error);
    return null;
  }
}

export function saveData(name: string, payload: any) : void {
  if (!name) return;
  try {
    localStorage.setItem(name, JSON.stringify(payload));
  } catch (error) {
    console.error(error);
    return;
  }
}

export function removeData(name: string) {
  if (!name) return;
  try {
    localStorage.removeItem(name);
  } catch (error) {
    console.error(error);
    return;
  }
}
