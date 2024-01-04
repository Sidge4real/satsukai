const filters = [
    { id: 1, name: 'Aesthetics' },
    { id: 2, name: 'Horticulture' },
    { id: 3, name: 'Maintenance' },
    { id: 3, name: 'Knowledge' },
    { id: 4, name: "Show all"}
  ];
  
  export default function handler(req : any, res : any) {
    if (req.method === 'GET') {
      res.status(200).json(filters);
    } else {
      res.status(400).json({ message: 'Method not allowed' });
    }
  }
  