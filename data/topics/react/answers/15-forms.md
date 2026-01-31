# 15. Forms / Formularios

## Form handling trong React?

### Trả lời / Answer:

**Form handling** trong React có 2 cách chính: Controlled và Uncontrolled components.

### Controlled Forms:

- Form values được lưu trong React state
- Mỗi input change → update state → re-render
- Có thể validate dễ dàng

### Uncontrolled Forms:

- Form values được lưu trong DOM
- Dùng ref để truy cập giá trị
- Code ít hơn, khó validate hơn

---

### Ví dụ thực tế / Practical Example:

```jsx
// Controlled Form
function ControlledForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Validate
    const error = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
        {errors.name && <span className="error">{errors.name}</span>}
      </div>
      <div>
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        {errors.email && <span className="error">{errors.email}</span>}
      </div>
      <div>
        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
        {errors.password && <span className="error">{errors.password}</span>}
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}
```

```jsx
// Uncontrolled Form
function UncontrolledForm() {
  const formRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(formRef.current);
    const data = Object.fromEntries(formData.entries());

    console.log("Form submitted:", data);
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit}>
      <div>
        <label>Name:</label>
        <input type="text" name="name" defaultValue="" />
      </div>
      <div>
        <label>Email:</label>
        <input type="email" name="email" defaultValue="" />
      </div>
      <div>
        <label>Password:</label>
        <input type="password" name="password" defaultValue="" />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}
```

---

## Formik vs React Hook Form?

### Trả lời / Answer:

### Formik:

- Library đầy đủ cho form handling
- Có validation, error handling, submission
- Học curve cao hơn
- Code nhiều hơn

### React Hook Form:

- Library nhẹ hơn, performant hơn
- Dùng hooks để quản lý form state
- Code ít hơn
- API đơn giản hơn

---

### So sánh chi tiết:

| Đặc điểm       | Formik       | React Hook Form |
| -------------- | ------------ | --------------- |
| Bundle size    | ~14KB        | ~9KB            |
| Performance    | Tốt hơn      | Tốt nhất        |
| API            | Phức tạp hơn | Đơn giản hơn    |
| Validation     | Built-in     | Tùy chọn        |
| Learning curve | Cao hơn      | Thấp hơn        |

---

### Ví dụ thực tế / Practical Example:

```jsx
// Formik
import { Formik, Form, Field, ErrorMessage } from "formik";

function FormikForm() {
  const initialValues = {
    name: "",
    email: "",
    password: "",
  };

  const validate = (values) => {
    const errors = {};

    if (!values.name) {
      errors.name = "Required";
    }
    if (!values.email) {
      errors.email = "Required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
      errors.email = "Invalid email";
    }
    if (!values.password) {
      errors.password = "Required";
    } else if (values.password.length < 6) {
      errors.password = "Must be at least 6 characters";
    }

    return errors;
  };

  const handleSubmit = (values, { setSubmitting }) => {
    setTimeout(() => {
      alert(JSON.stringify(values, null, 2));
      setSubmitting(false);
    }, 400);
  };

  return (
    <Formik
      initialValues={initialValues}
      validate={validate}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <Form>
          <div>
            <label htmlFor="name">Name</label>
            <Field id="name" name="name" type="text" />
            <ErrorMessage name="name" component="div" className="error" />
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <Field id="email" name="email" type="email" />
            <ErrorMessage name="email" component="div" className="error" />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <Field id="password" name="password" type="password" />
            <ErrorMessage name="password" component="div" className="error" />
          </div>
          <button type="submit" disabled={isSubmitting}>
            Submit
          </button>
        </Form>
      )}
    </Formik>
  );
}
```

```jsx
// React Hook Form
import { useForm } from "react-hook-form";

function ReactHookForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    alert(JSON.stringify(data, null, 2));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="name">Name</label>
        <input id="name" {...register("name", { required: "Required" })} />
        {errors.name && <span className="error">{errors.name.message}</span>}
      </div>
      <div>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          {...register("email", {
            required: "Required",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Invalid email",
            },
          })}
        />
        {errors.email && <span className="error">{errors.email.message}</span>}
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          {...register("password", {
            required: "Required",
            minLength: {
              value: 6,
              message: "Must be at least 6 characters",
            },
          })}
        />
        {errors.password && (
          <span className="error">{errors.password.message}</span>
        )}
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}
```

---

## Validation strategies?

### Trả lời / Answer:

### Các loại validation:

1. **Real-time validation:**
   - Validate khi user nhập
   - Hiển thị error ngay lập tức

2. **On-blur validation:**
   - Validate khi user rời khỏi field
   - Ít annoying hơn

3. **On-submit validation:**
   - Validate khi submit
   - Đơn giản nhất

4. **Schema validation:**
   - Dùng schema libraries (Yup, Zod)
   - Tái sử dụng validation rules

---

### Ví dụ thực tế / Practical Example:

```jsx
// Real-time validation với Yup
import * as yup from "yup";

const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

function ValidationForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const handleChange = async (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setTouched((prev) => ({ ...prev, [name]: true }));

    try {
      await schema.validateAt(name, { value });
      setErrors((prev) => ({ ...prev, [name]: null }));
    } catch (error) {
      setErrors((prev) => ({ ...prev, [name]: error.message }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    schema
      .validate(formData, { abortEarly: false })
      .then(() => {
        console.log("Form is valid:", formData);
      })
      .catch((errors) => {
        console.log("Form has errors:", errors);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
        {touched.name && errors.name && (
          <span className="error">{errors.name}</span>
        )}
      </div>
      <div>
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        {touched.email && errors.email && (
          <span className="error">{errors.email}</span>
        )}
      </div>
      <div>
        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
        {touched.password && errors.password && (
          <span className="error">{errors.password}</span>
        )}
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}
```

---

### On-blur validation:

```jsx
function BlurValidationForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });
  const [errors, setErrors] = useState({});

  const handleBlur = (e) => {
    const { name, value } = e.target;
    const error = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {errors.name && <span className="error">{errors.name}</span>}
      </div>
      <div>
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {errors.email && <span className="error">{errors.email}</span>}
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}
```

---

## Controlled vs Uncontrolled forms?

### Trả lời / Answer:

### Controlled Forms:

- Form values được lưu trong React state
- Mỗi input change → update state → re-render
- Dễ validate và debug
- Tốt cho dynamic forms

### Uncontrolled Forms:

- Form values được lưu trong DOM
- Dùng ref để truy cập giá trị
- Code ít hơn
- Tốt cho simple forms

---

### Ví dụ thực tế / Practical Example:

```jsx
// Controlled Form
function ControlledForm() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login:", formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Username:</label>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
      </div>
      <button type="submit">Login</button>
    </form>
  );
}
```

```jsx
// Uncontrolled Form
function UncontrolledForm() {
  const formRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(formRef.current);
    const data = Object.fromEntries(formData.entries());

    console.log("Login:", data);
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit}>
      <div>
        <label>Username:</label>
        <input type="text" name="username" defaultValue="" />
      </div>
      <div>
        <label>Password:</label>
        <input type="password" name="password" defaultValue="" />
      </div>
      <button type="submit">Login</button>
    </form>
  );
}
```

---

### Hybrid approach:

```jsx
function HybridForm() {
  const [errors, setErrors] = useState({});
  const formRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(formRef.current);
    const data = Object.fromEntries(formData.entries());

    // Validate
    const validationErrors = validate(data);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      console.log("Form submitted:", data);
    }
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit}>
      <div>
        <label>Username:</label>
        <input type="text" name="username" defaultValue="" />
        {errors.username && <span className="error">{errors.username}</span>}
      </div>
      <div>
        <label>Password:</label>
        <input type="password" name="password" defaultValue="" />
        {errors.password && <span className="error">{errors.password}</span>}
      </div>
      <button type="submit">Login</button>
    </form>
  );
}
```

---

## Form state management patterns?

### Trả lời / Answer:

### Các patterns:

1. **Single state object:**
   - Tất cả form fields trong một object
   - Dễ quản lý

2. **Multiple states:**
   - Mỗi field có state riêng
   - Code nhiều hơn

3. **Reducer pattern:**
   - Dùng useReducer cho complex forms
   - Tốt cho forms với nhiều fields

4. **Custom hook pattern:**
   - Tạo custom hook cho form logic
   - Tái sử dụng được

---

### Ví dụ thực tế / Practical Example:

```jsx
// Single state object pattern
function SingleStateForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    age: 0,
    newsletter: false,
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Age:</label>
        <input
          type="number"
          name="age"
          value={formData.age}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>
          <input
            type="checkbox"
            name="newsletter"
            checked={formData.newsletter}
            onChange={handleChange}
          />
          Subscribe to newsletter
        </label>
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}
```

```jsx
// Reducer pattern
function formReducer(state, action) {
  switch (action.type) {
    case "SET_FIELD":
      return { ...state, [action.field]: action.value };
    case "SET_ERRORS":
      return { ...state, errors: action.errors };
    case "RESET":
      return action.initialState;
    default:
      return state;
  }
}

function ReducerForm() {
  const initialState = {
    name: "",
    email: "",
    password: "",
    errors: {},
  };

  const [state, dispatch] = useReducer(formReducer, initialState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch({ type: "SET_FIELD", field: name, value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", state);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={state.name}
          onChange={handleChange}
        />
        {state.errors.name && (
          <span className="error">{state.errors.name}</span>
        )}
      </div>
      <div>
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={state.email}
          onChange={handleChange}
        />
        {state.errors.email && (
          <span className="error">{state.errors.email}</span>
        )}
      </div>
      <div>
        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={state.password}
          onChange={handleChange}
        />
        {state.errors.password && (
          <span className="error">{state.errors.password}</span>
        )}
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}
```

```jsx
// Custom hook pattern
function useForm(initialValues, validate) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));

    if (validate) {
      const error = validate(name, value);
      setErrors((prev) => ({ ...prev, [name]: error }));
    }
  };

  const handleSubmit = (callback) => (e) => {
    e.preventDefault();
    callback(values);
  };

  const reset = () => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
  };

  return {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    reset,
  };
}

// Sử dụng
function CustomHookForm() {
  const initialValues = {
    name: "",
    email: "",
    password: "",
  };

  const validate = (field, value) => {
    if (!value) return "Required";
    if (field === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      return "Invalid email";
    }
    return null;
  };

  const { values, errors, touched, handleChange, handleBlur, handleSubmit } =
    useForm(initialValues, validate);

  const onSubmit = (values) => {
    console.log("Form submitted:", values);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={values.name}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {touched.name && errors.name && (
          <span className="error">{errors.name}</span>
        )}
      </div>
      <div>
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {touched.email && errors.email && (
          <span className="error">{errors.email}</span>
        )}
      </div>
      <div>
        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={values.password}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {touched.password && errors.password && (
          <span className="error">{errors.password}</span>
        )}
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}
```

---

## Multi-step forms?

### Trả lời / Answer:

**Multi-step forms** là forms có nhiều steps/pages, user đi qua từng step.

### Các patterns:

1. **State-based steps:**
   - Dùng state để track current step
   - Render form theo current step

2. **Wizard pattern:**
   - Có navigation buttons (Next, Previous)
   - Validate mỗi step trước khi next

3. **Progress indicator:**
   - Hiển thị progress
   - User biết mình ở đâu

---

### Ví dụ thực tế / Practical Example:

```jsx
function MultiStepForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    step1: { name: "", email: "" },
    step2: { address: "", city: "" },
    step3: { cardNumber: "", expiry: "", cvv: "" },
  });

  const steps = [
    { title: "Personal Info", component: Step1 },
    { title: "Address", component: Step2 },
    { title: "Payment", component: Step3 },
  ];

  const handleChange = (step, field, value) => {
    setFormData((prev) => ({
      ...prev,
      [step]: { ...prev[step], [field]: value },
    }));
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleSubmit = () => {
    console.log("Form submitted:", formData);
  };

  const StepComponent = steps[currentStep].component;

  return (
    <div>
      <h2>Multi-Step Form</h2>
      <div className="progress">
        {steps.map((step, index) => (
          <div
            key={index}
            className={`step ${index <= currentStep ? "active" : ""} ${index < currentStep ? "completed" : ""}`}
          >
            {step.title}
          </div>
        ))}
      </div>
      <StepComponent
        data={formData[`step${currentStep + 1}`]}
        onChange={handleChange}
      />
      <div className="buttons">
        {currentStep > 0 && <button onClick={handlePrevious}>Previous</button>}
        {currentStep < steps.length - 1 ? (
          <button onClick={handleNext}>Next</button>
        ) : (
          <button onClick={handleSubmit}>Submit</button>
        )}
      </div>
    </div>
  );
}

function Step1({ data, onChange }) {
  return (
    <div>
      <h3>Step 1: Personal Info</h3>
      <div>
        <label>Name:</label>
        <input
          type="text"
          value={data.name}
          onChange={(e) => onChange("step1", "name", e.target.value)}
        />
      </div>
      <div>
        <label>Email:</label>
        <input
          type="email"
          value={data.email}
          onChange={(e) => onChange("step1", "email", e.target.value)}
        />
      </div>
    </div>
  );
}

function Step2({ data, onChange }) {
  return (
    <div>
      <h3>Step 2: Address</h3>
      <div>
        <label>Address:</label>
        <input
          type="text"
          value={data.address}
          onChange={(e) => onChange("step2", "address", e.target.value)}
        />
      </div>
      <div>
        <label>City:</label>
        <input
          type="text"
          value={data.city}
          onChange={(e) => onChange("step2", "city", e.target.value)}
        />
      </div>
    </div>
  );
}

function Step3({ data, onChange }) {
  return (
    <div>
      <h3>Step 3: Payment</h3>
      <div>
        <label>Card Number:</label>
        <input
          type="text"
          value={data.cardNumber}
          onChange={(e) => onChange("step3", "cardNumber", e.target.value)}
        />
      </div>
      <div>
        <label>Expiry:</label>
        <input
          type="text"
          value={data.expiry}
          onChange={(e) => onChange("step3", "expiry", e.target.value)}
        />
      </div>
      <div>
        <label>CVV:</label>
        <input
          type="text"
          value={data.cvv}
          onChange={(e) => onChange("step3", "cvv", e.target.value)}
        />
      </div>
    </div>
  );
}
```
