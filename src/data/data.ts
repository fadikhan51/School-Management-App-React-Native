export type Category = {
    title: string;
    content: object[];
    status: string;
  };
  
  
  export type Data = Category[];
  
  const data: Data = [
    {
      title: 'January',
      content: [{
        DueAmount: 20000,
        DueDate: '2022-03-15',
        PaidAmount: 15000,
        Balance: 5000,
        Remarks: 'Payment pending',
      }
      ],
      status: 'Unpaid',
    },
    {
      title: 'Febuary',
      content: [{
        DueAmount: 3000,
        DueDate: '2022-03-15',
        PaidAmount: 3000,
        Balance: 0,
        Remarks: 'Paid',
      }
      ],
      status: 'Paid',
    },
    
  ];
  
  export default data;