const SignUpService = {
    createPendingUser: async (formData) => {
      const response = await fetch('http://your-backend-url/createPendingUser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      if (!response.ok) {
        throw new Error('Failed to create user');
      }
  
      return response.json();
    },
  };
  
  export default SignUpService;