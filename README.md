# Little Web Framework

A lightweight, experimental frontend web framework built from scratch with TypeScript.

## Overview

This framework is designed to demonstrate advanced TypeScript patterns and the principles of object-oriented programming, specifically favoring **composition over inheritance**. It provides a structured way to build web applications by separating concerns into distinct, reusable modules.

## Installation

```bash
npm install little-web-framework
```

## How to use

This framework operates by combining a `Model` (which handles data, events, and API synchronization) with a `View` (which handles rendering HTML and user events).

### 1. Creating a Model

Because the framework uses composition, you build your custom data entities by injecting the `Attributes`, `Eeventing`, and `Sync` modules into the base `Model`.

```typescript
import { Model, Attributes, Eeventing, Sync } from "little-web-framework";

export interface UserProps {
  id?: string;
  name?: string;
  age?: number;
}

const rootUrl = "http://localhost:3000/users";

export class User extends Model<UserProps> {
  // A static factory method makes initialization cleaner
  static buildUser(attrs: UserProps): User {
    return new User(
      new Attributes<UserProps>(attrs),
      new Eeventing(),
      new Sync<UserProps>(rootUrl),
    );
  }
}
```

### 2. Creating a View

To create a UI component, extend the `View` class. You must define an HTML `template` and you can map DOM events using `eventsMap`.

```typescript
import { View } from "little-web-framework";
import { User, UserProps } from "./User";

export class UserForm extends View<User, UserProps> {
  // Map standard DOM events to methods using 'eventName:selector' syntax
  eventsMap(): { [key: string]: () => void } {
    return {
      "click:.set-age": this.onSetAgeClick,
      "click:.set-name": this.onSetNameClick,
    };
  }

  onSetAgeClick = (): void => {
    // Calling .set() on the model automatically triggers a "change" event
    this.model.set({ age: Math.round(Math.random() * 100) });
  };

  onSetNameClick = (): void => {
    const input = this.parent.querySelector("input");
    if (input) {
      this.model.set({ name: input.value });
    }
  };

  template(): string {
    return `
      <div>
        <h1>User Form</h1>
        <div>User name: ${this.model.get("name")}</div>
        <div>User age: ${this.model.get("age")}</div>
        <input placeholder="Enter new name" />
        <button class="set-name">Change Name</button>
        <button class="set-age">Set Random Age</button>
      </div>
    `;
  }
}
```

### 3. Rendering to the DOM

Once your Model and View are defined, you bind them together. The View automatically re-renders whenever the Model's data changes.

```typescript
import { User } from "./User";
import { UserForm } from "./UserForm";

// 1. Initialize the model
const user = User.buildUser({ name: "Alice", age: 25 });

// 2. Find the root DOM element
const root = document.getElementById("root");

if (root) {
  // 3. Initialize and render the View
  const userForm = new UserForm(root, user);
  userForm.render();
} else {
  throw new Error("Root element not found");
}
```
