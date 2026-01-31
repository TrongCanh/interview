# 26. TypeScript with React

## Tổng quan về TypeScript with React

### Mục đích của TypeScript with React / Purpose

**TypeScript with React** - Kết hợp TypeScript với React để có type safety, IntelliSense tốt hơn, và catch errors tại compile-time.

**Mục đích chính:**

- Type safety cho React components
- IntelliSense tốt hơn cho props và state
- Catch errors tại compile-time thay vì runtime
- Better developer experience
- Code documentation tự động

### Khi nào cần hiểu về TypeScript with React / When to Use

Hiểu về TypeScript with React là cần thiết khi:

- Xây dựng React applications
- Làm việc với large codebases
- Xây dựng reusable components
- Làm việc với teams
- Implement complex state management

### Giúp ích gì / Benefits

**Lợi ích:**

- **Type Safety**: Catch errors tại compile-time
- **Better DX**: IntelliSense hoạt động tốt hơn
- **Refactoring**: Refactor code an toàn hơn
- **Documentation**: Types là documentation tự động
- **Team Collaboration**: Code rõ ràng hơn cho teams

### Ưu nhược điểm / Pros & Cons

| Ưu điểm               | Nhược điểm              |
| --------------------- | ----------------------- |
| - Type safety         | Learning curve          |
| - Better DX           | Cần maintain types      |
| - Compile-time errors | Build time lâu hơn      |
| - Refactoring         | Có thể verbose          |
| - Team collaboration  | Có thể over-engineering |

---

## Component props types?

**Component props types** - Define types cho component props.

### Mục đích / Purpose

Define types cho component props để có type safety.

### Khi nào dùng / When to Use

| Tình huống            | Khi nào dùng                  |
| --------------------- | ----------------------------- |
| - Component props     | Khi cần type safety cho props |
| - Function components | Khi define props types        |
| - Class components    | Khi define props types        |
| - Generic components  | Khi cần reusable components   |

### Giúp ích gì / Benefits

**Lợi ích:**

- **Type Safety**: Catch errors tại compile-time
- **IntelliSense**: IntelliSense hoạt động tốt hơn
- **Documentation**: Props types là documentation
- **Refactoring**: Refactor props an toàn hơn

### Ưu nhược điểm / Pros & Cons

| Ưu điểm         | Nhược điểm              |
| --------------- | ----------------------- |
| - Type safety   | Có thể verbose          |
| - IntelliSense  | Learning curve          |
| - Documentation | Cần maintain types      |
| - Refactoring   | Có thể over-engineering |

### Ví dụ:

```typescript
// Ví dụ cơ bản: Props types với interface
interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  variant?: "primary" | "secondary";
}

function Button({ children, onClick, disabled, variant = "primary" }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`btn btn-${variant}`}
    >
      {children}
    </button>
  );
}

// Ví dụ: Props types với type alias
type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  variant?: "primary" | "secondary";
};

function Button({ children, onClick, disabled, variant = "primary" }: ButtonProps) {
  return <button onClick={onClick} disabled={disabled}>{children}</button>;
}

// Ví dụ: Props types với generic components
interface ListProps<T> {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
}

function List<T>({ items, renderItem }: ListProps<T>) {
  return <ul>{items.map((item, index) => <li key={index}>{renderItem(item)}</li>)}</ul>;
}

// Ví dụ thực tế: User card component
interface UserCardProps {
  user: {
    id: number;
    name: string;
    email: string;
    avatar?: string;
  };
  onEdit?: (user: UserCardProps["user"]) => void;
  onDelete?: (userId: number) => void;
}

function UserCard({ user, onEdit, onDelete }: UserCardProps) {
  return (
    <div className="user-card">
      {user.avatar && <img src={user.avatar} alt={user.name} />}
      <h3>{user.name}</h3>
      <p>{user.email}</p>
      <div className="actions">
        <button onClick={() => onEdit(user)}>Edit</button>
        <button onClick={() => onDelete(user.id)}>Delete</button>
      </div>
    </div>
  );
}

// Ví dụ thực tế: Form component
interface FormProps {
  onSubmit: (data: FormData) => void;
  initialData?: Partial<FormData>;
}

interface FormData {
  username: string;
  email: string;
  password: string;
}

function Form({ onSubmit, initialData }: FormProps) {
  const [formData, setFormData] = React.useState<FormData>({
    username: "",
    email: "",
    password: "",
    ...initialData,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={formData.username}
        onChange={(e) => setFormData({ ...formData, username: e.target.value })}
      />
      <input
        type="email"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
      />
      <input
        type="password"
        value={formData.password}
        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
      />
      <button type="submit">Submit</button>
    </form>
  );
}
```

### Best Practices:

```typescript
// ✅ Dùng interface cho component props
interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
}

function Button({ children, onClick }: ButtonProps) {
  return <button onClick={onClick}>{children}</button>;
}

// ✅ Dùng type alias cho simple props
type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
};

// ✅ Dùng generics cho reusable components
interface ListProps<T> {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
}

// ✅ Dùng React.FC cho function components
const Button: React.FC<ButtonProps> = ({ children, onClick }) => {
  return <button onClick={onClick}>{children}</button>;
};

// ❌ Không nên dùng any cho props
interface BadProps {
  data: any; // ❌ Avoid any
}

// ✅ Nên dùng specific types
interface GoodProps {
  data: User; // ✅ Use specific type
}

// ✅ Dùng optional cho optional props
interface Props {
  requiredProp: string;
  optionalProp?: string; // ✅ Optional
}

// ✅ Dùng default values cho optional props
function Component({ optionalProp = "default" }: Props) {
  // ...
}
```

---

## `FC` type?

**`FC` type** - `React.FunctionComponent` type, shorthand cho function component types.

### Mục đích / Purpose

Define types cho function components.

### Khi nào dùng / When to Use

| Tình huống            | Khi nào dùng                        |
| --------------------- | ----------------------------------- |
| - Function components | Khi define function component types |
| - Type safety         | Khi cần type safety cho components  |
| - IntelliSense        | Khi muốn IntelliSense tốt hơn       |

### Giúp ích gì / Benefits

**Lợi ích:**

- **Type Safety**: Catch errors tại compile-time
- **IntelliSense**: IntelliSense hoạt động tốt hơn
- **Shorthand**: Ngắn gọn hơn full type definition
- **Documentation**: Types là documentation tự động
- **Best Practices**: React khuyến khích

### Ưu nhược điểm / Pros & Cons

| Ưu điểm         | Nhược điểm                       |
| --------------- | -------------------------------- |
| - Type safety   | Có thể verbose                   |
| - IntelliSense  | Learning curve                   |
| - Shorthand     | Không phải lúc nào cũng tốt nhất |
| - Documentation | Cần maintain types               |

### Ví dụ:

```typescript
// Ví dụ cơ bản: React.FC
interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({ children, onClick, disabled }) => {
  return (
    <button onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
};

// Ví dụ: React.FC với generics
interface ListProps<T> {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
}

const List = <T,>({ items, renderItem }: ListProps<T>) => {
  return <ul>{items.map((item, index) => <li key={index}>{renderItem(item)}</li>)}</ul>;
};

// Ví dụ thực tế: User card component với React.FC
interface UserCardProps {
  user: {
    id: number;
    name: string;
    email: string;
  };
  onEdit?: (user: UserCardProps["user"]) => void;
  onDelete?: (userId: number) => void;
}

const UserCard: React.FC<UserCardProps> = ({ user, onEdit, onDelete }) => {
  return (
    <div className="user-card">
      <h3>{user.name}</h3>
      <p>{user.email}</p>
      <div className="actions">
        <button onClick={() => onEdit(user)}>Edit</button>
        <button onClick={() => onDelete(user.id)}>Delete</button>
      </div>
    </div>
  );
};

// Ví dụ thực tế: Form component với React.FC
interface FormProps {
  onSubmit: (data: FormData) => void;
  initialData?: Partial<FormData>;
}

interface FormData {
  username: string;
  email: string;
  password: string;
}

const Form: React.FC<FormProps> = ({ onSubmit, initialData }) => {
  const [formData, setFormData] = React.useState<FormData>({
    username: "",
    email: "",
    password: "",
    ...initialData,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={formData.username}
        onChange={(e) => setFormData({ ...formData, username: e.target.value })}
      />
      <input
        type="email"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
      />
      <input
        type="password"
        value={formData.password}
        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
      />
      <button type="submit">Submit</button>
    </form>
  );
};
```

### Best Practices:

```typescript
// ✅ Dùng React.FC cho function components
const Button: React.FC<ButtonProps> = ({ children, onClick }) => {
  return <button onClick={onClick}>{children}</button>;
};

// ✅ Dùng React.FC với generics
const List = <T,>({ items, renderItem }: ListProps<T>) => {
  return <ul>{items.map((item, index) => <li key={index}>{renderItem(item)}</li>)}</ul>;
};

// ✅ Dùng React.FC với default props
const Button: React.FC<ButtonProps> = ({ children, onClick, disabled = false }) => {
  return <button onClick={onClick} disabled={disabled}>{children}</button>;
};

// ✅ Dùng React.FC với children prop
const Card: React.FC<{ title: string }> = ({ title, children }) => {
  return (
    <div className="card">
      <h2>{title}</h2>
      <div>{children}</div>
    </div>
  );
};

// ✅ Dùng React.FC với refs
const Input: React.FC<InputProps> = ({ forwardedRef, ...props }) => {
  return <input ref={forwardedRef} {...props} />;
};

// ❌ Không nên dùng React.FC cho class components
class BadComponent extends React.Component<Props, State> {
  // ❌ Không dùng React.FC cho class components
}

// ✅ Nên dùng React.FC chỉ cho function components
const GoodComponent: React.FC<Props> = ({ prop }) => {
  return <div>{prop}</div>;
};

// ❌ Không nên dùng React.FC khi không cần
// ✅ Nên dùng regular function khi không cần React.FC features
function GoodComponent({ prop }: { prop: string }) {
  return <div>{prop}</div>;
}
```

---

## `React.FC` vs direct function?

**`React.FC` vs direct function** - So sánh giữa `React.FC` và direct function types.

### Mục đích / Purpose

Hiểu sự khác nhau giữa `React.FC` và direct function types.

### Khi nào dùng / When to Use

| Tình huống         | Khi nào dùng                    |
| ------------------ | ------------------------------- |
| React.FC           | Khi cần React.FC features       |
| Direct function    | Khi không cần React.FC features |
| Simple components  | Khi components đơn giản         |
| Complex components | Khi cần type safety             |

### Giúp ích gì / Benefits

**Lợi ích:**

- **Type Safety**: Catch errors tại compile-time
- **IntelliSense**: IntelliSense hoạt động tốt hơn
- **Documentation**: Types là documentation tự động
- **Best Practices**: React khuyến khích

### Ưu nhược điểm / Pros & Cons

| Type            | Ưu điểm                                  | Nhược điểm                                |
| --------------- | ---------------------------------------- | ----------------------------------------- |
| React.FC        | Children prop, defaultProps, displayName | Có thể verbose, deprecated trong React 18 |
| Direct function | Ngắn gọn hơn                             | Không có children prop                    |

### Ví dụ:

```typescript
// Ví dụ cơ bản: React.FC vs direct function
interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
}

// React.FC
const ButtonFC: React.FC<ButtonProps> = ({ children, onClick }) => {
  return <button onClick={onClick}>{children}</button>;
};

// Direct function
function ButtonDirect({ children, onClick }: ButtonProps) {
  return <button onClick={onClick}>{children}</button>;
}

// Ví dụ: Children prop với React.FC
const Card: React.FC<{ title: string }> = ({ title, children }) => {
  return (
    <div className="card">
      <h2>{title}</h2>
      <div>{children}</div>
    </div>
  );
};

// Direct function không có children prop
function CardDirect({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="card">
      <h2>{title}</h2>
      <div>{children}</div>
    </div>
  );
}

// Ví dụ thực tế: Generic component với React.FC
interface ListProps<T> {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
}

const ListFC: React.FC<ListProps<string>> = ({ items, renderItem }) => {
  return <ul>{items.map((item, index) => <li key={index}>{renderItem(item)}</li>)}</ul>;
};

// Direct function với generic
function ListDirect<T>({ items, renderItem }: ListProps<T>) {
  return <ul>{items.map((item, index) => <li key={index}>{renderItem(item)}</li>)}</ul>;
}

// Ví dụ thực tế: defaultProps với React.FC
interface Props {
  count: number;
}

const CounterFC: React.FC<Props> = ({ count = 0 }) => {
  // count có default value là 0
  return <div>Count: {count}</div>;
};

// Direct function không có defaultProps
function CounterDirect({ count = 0 }: Props) {
  return <div>Count: {count}</div>;
}
```

### Best Practices:

```typescript
// ✅ Dùng direct function cho simple components
function Button({ children, onClick }: ButtonProps) {
  return <button onClick={onClick}>{children}</button>;
}

// ✅ Dùng React.FC khi cần children prop
const Card: React.FC<{ title: string }> = ({ title, children }) => {
  return (
    <div className="card">
      <h2>{title}</h2>
      <div>{children}</div>
    </div>
  );
};

// ✅ Dùng direct function cho generic components
function List<T>({ items, renderItem }: ListProps<T>) {
  return <ul>{items.map((item, index) => <li key={index}>{renderItem(item)}</li>)}</ul>;
}

// ✅ Dùng React.FC cho complex components
const ComplexComponent: React.FC<ComplexProps> = ({ prop1, prop2 }) => {
  // Complex logic
  return <div>{prop1} {prop2}</div>;
};

// ❌ Không nên dùng React.FC cho class components
class BadComponent extends React.Component<Props, State> {
  // ❌ Không dùng React.FC cho class components
}

// ✅ Nên dùng React.FC chỉ cho function components
const GoodComponent: React.FC<Props> = ({ prop }) => {
  return <div>{prop}</div>;
};

// ❌ Không nên dùng React.FC khi không cần
// ✅ Nên dùng direct function khi không cần React.FC features
function GoodComponent({ prop }: { prop: string }) {
  return <div>{prop}</div>;
}
```

---

## Event handler types?

**Event handler types** - Types cho React event handlers.

### Mục đích / Purpose

Define types cho React event handlers.

### Khi nào dùng / When to Use

| Tình huống          | Khi nào dùng                           |
| ------------------- | -------------------------------------- |
| - Event handlers    | Khi cần type safety cho event handlers |
| - Form submissions  | Khi handle form submissions            |
| - User interactions | Khi handle user interactions           |
| - DOM events        | Khi handle DOM events                  |

### Giúp ích gì / Benefits

**Lợi ích:**

- **Type Safety**: Catch errors tại compile-time
- **IntelliSense**: IntelliSense hoạt động tốt hơn
- **Documentation**: Types là documentation tự động
- **Refactoring**: Refactor handlers an toàn hơn

### Ưu nhược điểm / Pros & Cons

| Ưu điểm         | Nhược điểm              |
| --------------- | ----------------------- |
| - Type safety   | Có thể verbose          |
| - IntelliSense  | Learning curve          |
| - Documentation | Cần maintain types      |
| Refactoring     | Có thể over-engineering |

### Ví dụ:

```typescript
// Ví dụ cơ bản: Event handler types
function Button() {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    console.log("Button clicked", e.clientX, e.clientY);
  };

  return <button onClick={handleClick}>Click me</button>;
}

// Ví dụ: Form event handlers
interface FormProps {
  onSubmit: (data: FormData) => void;
}

interface FormData {
  username: string;
  email: string;
}

function Form({ onSubmit }: FormProps) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = {
      username: e.currentTarget.username.value,
      email: e.currentTarget.email.value,
    };
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="username" />
      <input name="email" />
      <button type="submit">Submit</button>
    </form>
  );
}

// Ví dụ thực tế: Input event handlers
interface InputProps {
  onChange: (value: string) => void;
  value: string;
}

function Input({ onChange, value }: InputProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return <input type="text" value={value} onChange={handleChange} />;
}

// Ví dụ thực tế: Keyboard event handlers
function Keylogger() {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    console.log("Key pressed:", e.key);
  };

  return <input onKeyDown={handleKeyDown} />;
}

// Ví dụ thực tế: Focus event handlers
function FocusTracker() {
  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    console.log("Input focused", e.target.name);
  };

  return <input name="username" onFocus={handleFocus} />;
}

// Ví dụ thực tế: Drag and drop event handlers
interface DropZoneProps {
  onDrop: (files: File[]) => void;
}

function DropZone({ onDrop }: DropZoneProps) {
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files) as File[];
    onDrop(files);
  };

  return <div onDrop={handleDrop}>Drop files here</div>;
}
```

### Best Practices:

```typescript
// ✅ Dùng React event types cho event handlers
function Button() {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    console.log("Button clicked", e.clientX, e.clientY);
  };

  return <button onClick={handleClick}>Click me</button>;
}

// ✅ Dùng React.ChangeEvent cho input handlers
function Input({ onChange, value }: InputProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return <input type="text" value={value} onChange={handleChange} />;
}

// ✅ Dùng React.FormEvent cho form handlers
function Form({ onSubmit }: FormProps) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = {
      username: e.currentTarget.username.value,
      email: e.currentTarget.email.value,
    };
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="username" />
      <input name="email" />
      <button type="submit">Submit</button>
    </form>
  );
}

// ✅ Dùng React.KeyboardEvent cho keyboard handlers
function Keylogger() {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    console.log("Key pressed:", e.key);
  };

  return <input onKeyDown={handleKeyDown} />;
}

// ❌ Không nên dùng Event cho generic event handlers
function badHandler(e: Event) {
  console.log("Event:", e); // ❌ Too generic
}

// ✅ Nên dùng specific event types
function goodHandler(e: React.MouseEvent<HTMLButtonElement>) {
  console.log("Button clicked:", e.clientX, e.clientY); // ✅ Specific type
}

// ✅ Dùng event types với generics
function createHandler<T extends Event>(
  handler: (e: T) => void
): (e: React.SyntheticEvent<T>) => void {
  return (e) => handler(e as T);
}

const handleClick = createHandler<React.MouseEvent<HTMLButtonElement>>((e) => {
  console.log("Button clicked:", e.clientX, e.clientY);
});
```

---

## `useRef`, `useState`, `useEffect` với types?

**`useRef`, `useState`, `useEffect` với types** - Type-safe React hooks.

### Mục đích / Purpose

Dùng React hooks với type safety.

### Khi nào dùng / When to Use

| Tình huống   | Khi nào dùng                  |
| ------------ | ----------------------------- |
| useRef       | Khi cần refs cho DOM elements |
| useState     | Khi cần state management      |
| useEffect    | Khi cần side effects          |
| Custom hooks | Khi tạo reusable hooks        |

### Giúp ích gì / Benefits

**Lợi ích:**

- **Type Safety**: Catch errors tại compile-time
- **IntelliSense**: IntelliSense hoạt động tốt hơn
- **Refactoring**: Refactor hooks an toàn hơn
- **Documentation**: Types là documentation tự động

### Ưu nhược điểm / Pros & Cons

| Ưu điểm         | Nhược điểm              |
| --------------- | ----------------------- |
| - Type safety   | Có thể verbose          |
| IntelliSense    | Learning curve          |
| - Refactoring   | Có thể over-engineering |
| - Documentation | Cần maintain types      |

### Ví dụ:

```typescript
// Ví dụ cơ bản: useState với types
function Counter() {
  const [count, setCount] = React.useState<number>(0);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <button onClick={() => setCount(count - 1)}>Decrement</button>
    </div>
  );
}

// Ví dụ: useState với object types
interface User {
  id: number;
  name: string;
  email: string;
}

function UserForm() {
  const [user, setUser] = React.useState<User>({
    id: 0,
    name: "",
    email: "",
  });

  const handleChange = (field: keyof User) => (value: string) => {
    setUser({ ...user, [field]: value });
  };

  return (
    <form>
      <input
        type="text"
        value={user.name}
        onChange={(e) => handleChange("name", e.target.value)}
      />
      <input
        type="email"
        value={user.email}
        onChange={(e) => handleChange("email", e.target.value)}
      />
    </form>
  );
}

// Ví dụ: useRef với types
function TextInput() {
  const inputRef = React.useRef<HTMLInputElement>(null);

  const focus = () => {
    inputRef.current?.focus();
  };

  return (
    <div>
      <input ref={inputRef} type="text" />
      <button onClick={focus}>Focus</button>
    </div>
  );
}

// Ví dụ: useEffect với types
function UserProfile({ userId }: { userId: number }) {
  const [user, setUser] = React.useState<User | null>(null);

  React.useEffect(() => {
    fetch(`/api/users/${userId}`)
      .then((res) => res.json())
      .then(setUser);
  }, [userId]);

  if (!user) return <div>Loading...</div>;

  return (
    <div>
      <h1>{user.name}</h1>
      <p>{user.email}</p>
    </div>
  );
}

// Ví dụ thực tế: Custom hook với types
function useApi<T>(url: string): {
  const [data, setData] = React.useState<T | null>(null);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | null>(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(url);
      const result = await response.json();
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, refetch: fetchData };
}

function UserList() {
  const { data, loading, error, refetch } = useApi<User[]>("/api/users");

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <ul>{data?.map((user) => <li key={user.id}>{user.name}</li>)}</ul>
      <button onClick={refetch}>Refresh</button>
    </div>
  );
}

// Ví dụ thực tế: useReducer với types
type State = {
  count: number;
};

type Action =
  | { type: "increment" }
  | { type: "decrement" }
  | { type: "set"; payload: number };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "increment":
      return { count: state.count + 1 };
    case "decrement":
      return { count: state.count - 1 };
    case "set":
      return { count: action.payload };
    default:
      return state;
  }
}

function Counter() {
  const [state, dispatch] = React.useReducer(reducer, { count: 0 });

  return (
    <div>
      <p>Count: {state.count}</p>
      <button onClick={() => dispatch({ type: "increment" })}>Increment</button>
      <button onClick={() => dispatch({ type: "decrement" })}>Decrement</button>
      <button onClick={() => dispatch({ type: "set", payload: 10 })}>Set to 10</button>
    </div>
  );
}
```

### Best Practices:

```typescript
// ✅ Dùng useState với types
const [count, setCount] = React.useState<number>(0);

// ✅ Dùng useState với object types
const [user, setUser] = React.useState<User>({
  id: 0,
  name: "",
  email: "",
});

// ✅ Dùng useRef với types
const inputRef = React.useRef<HTMLInputElement>(null);

// ✅ Dùng useEffect với dependency array
React.useEffect(() => {
  console.log("Effect ran");
}, [dependency]);

// ✅ Dùng custom hooks với types
function useApi<T>(url: string) {
  const [data, setData] = React.useState<T | null>(null);
  // ...
  return { data, loading, error, refetch: fetchData };
}

// ✅ Dùng useReducer với types
type State = {
  count: number;
};

type Action = { type: "increment" } | { type: "decrement" };

const [state, dispatch] = React.useReducer(reducer, initialState);

// ❌ Không nên dùng useState với any
const [data, setData] = React.useState<any>(null); // ❌ Avoid any

// ✅ Nên dùng specific types
const [user, setUser] = React.useState<User | null>(null); // ✅ Specific type

// ❌ Không nên dùng useEffect với missing dependencies
React.useEffect(() => {
  console.log("Effect ran");
}, [dependency]); // ✅ Include dependency

// ❌ Không nên dùng useRef với wrong type
const inputRef = React.useRef<HTMLDivElement>(null); // ❌ Wrong element type

// ✅ Nên dùng useRef với correct type
const inputRef = React.useRef<HTMLInputElement>(null); // ✅ Correct element type
```

---

## Generic components?

**Generic components** - Components có thể làm việc với nhiều types.

### Mục đích / Purpose

Tạo components có thể reuse với nhiều types.

### Khi nào dùng / When to Use

| Tình huống            | Khi nào dùng                                 |
| --------------------- | -------------------------------------------- |
| - Reusable components | Khi cần components làm việc với nhiều types  |
| - Type-safe lists     | Khi cần type-safe list components            |
| - Form components     | Khi cần form components với dynamic fields   |
| - Data tables         | Khi cần table components với dynamic columns |

### Giúp ích gì / Benefits

**Lợi ích:**

- **Reusability**: Dùng lại components với nhiều types
- **Type Safety**: Catch errors tại compile-time
- **IntelliSense**: IntelliSense hoạt động tốt hơn
- **Documentation**: Types là documentation tự động
- **Flexibility**: Components linh hoạt động hơn

### Ưu nhược điểm / Pros & Cons

| Ưu điểm        | Nhược điểm              |
| -------------- | ----------------------- |
| - Reusability  | Có thể phức tạp         |
| - Type safety  | Learning curve          |
| - IntelliSense | Có thể verbose          |
| - Flexibility  | Có thể over-engineering |

### Ví dụ:

```typescript
// Ví dụ cơ bản: Generic list component
interface ListProps<T> {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
  keyExtractor: (item: T) => string;
}

function List<T>({ items, renderItem, keyExtractor }: ListProps<T>) {
  return (
    <ul>
      {items.map((item) => (
        <li key={keyExtractor(item)}>{renderItem(item)}</li>
      ))}
    </ul>
  );
}

// Sử dụng
interface User {
  id: number;
  name: string;
  email: string;
}

function UserList() {
  const users: User[] = [
    { id: 1, name: "Alice", email: "alice@example.com" },
    { id: 2, name: "Bob", email: "bob@example.com" },
  ];

  return (
    <List
      items={users}
      renderItem={(user) => (
        <div>
          <h3>{user.name}</h3>
          <p>{user.email}</p>
        </div>
      )}
      keyExtractor={(user) => user.id.toString()}
    />
  );
}

// Ví dụ: Generic table component
interface TableProps<T> {
  data: T[];
  columns: Column<T>[];
}

interface Column<T> {
  header: string;
  key: keyof T;
  render: (value: T[keyof T]) => React.ReactNode;
}

function Table<T>({ data, columns }: TableProps<T>) {
  return (
    <table>
      <thead>
        <tr>
          {columns.map((col) => (
            <th key={col.key as string}>{col.header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, index) => (
          <tr key={index}>
            {columns.map((col) => (
              <td key={col.key as string}>{col.render(row[col.key])}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

// Sử dụng
interface Product {
  id: number;
  name: string;
  price: number;
}

function ProductTable() {
  const products: Product[] = [
    { id: 1, name: "Widget A", price: 9.99 },
    { id: 2, name: "Widget B", price: 19.99 },
  ];

  const columns: Column<Product>[] = [
    { header: "ID", key: "id", render: (value) => value.toString() },
    { header: "Name", key: "name", render: (value) => value },
    { header: "Price", key: "price", render: (value) => `$${value.toFixed(2)}` },
  ];

  return <Table data={products} columns={columns} />;
}

// Ví dụ thực tế: Generic form component
interface FormField<T> {
  name: keyof T;
  label: string;
  type: "text" | "email" | "password";
}

interface FormProps<T> {
  data: T;
  fields: FormField<T>[];
  onChange: (field: keyof T, value: string) => void;
}

function Form<T>({ data, fields, onChange }: FormProps<T>) {
  return (
    <form>
      {fields.map((field) => (
        <div key={field.name as string}>
          <label>{field.label}</label>
          <input
            type={field.type}
            value={data[field.name] as string}
            onChange={(e) => onChange(field.name, e.target.value)}
          />
        </div>
      ))}
    </form>
  );
}

// Sử dụng
interface UserData {
  username: string;
  email: string;
  password: string;
}

function UserForm() {
  const [data, setData] = React.useState<UserData>({
    username: "",
    email: "",
    password: "",
  });

  const fields: FormField<UserData>[] = [
    { name: "username", label: "Username", type: "text" },
    { name: "email", label: "Email", type: "email" },
    { name: "password", label: "Password", type: "password" },
  ];

  return <Form data={data} fields={fields} onChange={(field, value) => setData({ ...data, [field]: value })} />;
}

// Ví dụ thực tế: Generic card component
interface CardProps<T> {
  item: T;
  renderHeader: (item: T) => React.ReactNode;
  renderContent: (item: T) => React.ReactNode;
}

function Card<T>({ item, renderHeader, renderContent }: CardProps<T>) {
  return (
    <div className="card">
      <div className="card-header">{renderHeader(item)}</div>
      <div className="card-content">{renderContent(item)}</div>
    </div>
  );
}

// Sử dụng với User
function UserCard({ user }: { user: User }) {
  return (
    <Card
      item={user}
      renderHeader={(user) => <h2>{user.name}</h2>}
      renderContent={(user) => (
        <div>
          <p>Email: {user.email}</p>
          <p>ID: {user.id}</p>
        </div>
      )}
    />
  );
}
```

### Best Practices:

```typescript
// ✅ Dùng generic components cho reusable logic
interface ListProps<T> {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
}

function List<T>({ items, renderItem }: ListProps<T>) {
  return <ul>{items.map((item) => <li>{renderItem(item)}</li>)}</ul>;
}

// ✅ Dùng generic components với type constraints
interface SelectProps<T extends { id: string | number }> {
  options: T[];
  value: T;
  onChange: (value: T) => void;
}

function Select<T extends { id: string | number }>({ options, value, onChange }: SelectProps<T>) {
  return (
    <select value={value.id} onChange={(e) => onChange(options.find((o) => o.id === e.target.value)!)}>
      {options.map((option) => (
        <option key={option.id} value={option.id}>{option.name}</option>
      ))}
    </select>
  );
}

// ✅ Dùng generic components với multiple type parameters
interface TableProps<T, K extends keyof T> {
  data: T[];
  columns: Column<T, K>[];
}

interface Column<T, K extends keyof T> {
  header: string;
  key: K;
  render: (value: T[K]) => React.ReactNode;
}

function Table<T, K extends keyof T>({ data, columns }: TableProps<T, K>) {
  return (
    <table>
      <thead>
        <tr>
          {columns.map((col) => (
            <th key={col.key as string}>{col.header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, index) => (
          <tr key={index}>
            {columns.map((col) => (
              <td key={col.key as string}>{col.render(row[col.key])}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

// ❌ Không nên dùng generic components khi không cần
function SimpleComponent({ text }: { text: string }) {
  return <div>{text}</div>;
}

// ✅ Nên dùng regular components khi không cần generics
// ✅ Dùng generic components khi cần reusability
interface ListProps<T> {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
}

function List<T>({ items, renderItem }: ListProps<T>) {
  return <ul>{items.map((item) => <li>{renderItem(item)}</li>)}</ul>;
}

// ✅ Dùng generic components với type constraints
interface Props<T extends { id: string | number }> {
  options: T[];
  value: T;
  onChange: (value: T) => void;
}

function Select<T extends { id: string | number }>({ options, value, onChange }: Props<T>) {
  return (
    <select value={value.id} onChange={(e) => onChange(options.find((o) => o.id === e.target.value)!)}>
      {options.map((option) => (
        <option key={option.id} value={option.id}>{option.name}</option>
      ))}
    </select>
  );
}
```

---

## Tổng kết

### Bảng so sánh TypeScript with React Features

| Feature            | Mô tả                             | Use Case                        |
| ------------------ | --------------------------------- | ------------------------------- |
| Component props    | Define types cho props            | Type safety cho components      |
| React.FC           | Shorthand cho function components | Define function component types |
| Event handlers     | Types cho event handlers          | Type safety cho handlers        |
| Hooks              | Type-safe hooks                   | State management với types      |
| Generic components | Reusable components               | Components với nhiều types      |

### Khi nào nên dùng TypeScript with React

| Tình huống               | Nên dùng            |
| ------------------------ | ------------------- |
| Large codebases          | ✅ TypeScript       |
| Team collaboration       | ✅ TypeScript       |
| Complex state management | ✅ TypeScript       |
| Reusable components      | ✅ TypeScript       |
| Simple prototypes        | ❌ Có thể không cần |

### Best Practices chung cho TypeScript with React

1. **Define props types**: Luôn define types cho component props
2. **Dùng React.FC khi cần**: Sử dụng React.FC khi cần children prop
3. **Type-safe hooks**: Dùng hooks với type safety
4. **Avoid any**: Tránh dùng any types
5. **Generic components**: Dùng generics cho reusable components

### Anti-patterns cần tránh

```typescript
// ❌ Dùng any cho props
interface BadProps {
  data: any; // ❌ Avoid any
}

// ✅ Nên dùng specific types
interface GoodProps {
  data: User; // ✅ Use specific type
}

// ❌ Dùng React.FC cho class components
class BadComponent extends React.Component<Props, State> {
  // ❌ Không dùng React.FC cho class components
}

// ✅ Nên dùng React.FC chỉ cho function components
const GoodComponent: React.FC<Props> = ({ prop }) => {
  return <div>{prop}</div>;
};

// ❌ Quên type event handlers
function BadComponent() {
  return <button onClick={(e) => console.log(e.clientX)}>Click</button>; // ❌ Event type is generic
}

// ✅ Nên type event handlers
function GoodComponent() {
  return <button onClick={(e: React.MouseEvent<HTMLButtonElement>) => console.log(e.clientX)}>Click</button>; // ✅ Specific event type
}

// ❌ Quên type hooks
const [data, setData] = React.useState(null); // ❌ Type is any

// ✅ Nên type hooks
const [user, setUser] = React.useState<User | null>(null); // ✅ Specific type
```

---

## Tài liệu tham khảo / References

- [React TypeScript Cheatsheet](https://react-typescript-cheatsheet.netlify.app/)
- [TypeScript React - Basic Types](https://www.typescriptlang.org/docs/handbook/intro.html)
- [React - TypeScript](https://react.dev/learn-typescript)
- [TypeScript - React](https://www.typescriptlang.org/docs/handbook/intro.html)

---

_Last updated: 2026-01-30_
