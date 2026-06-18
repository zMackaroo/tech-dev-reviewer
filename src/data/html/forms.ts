import type { InterviewQuestion } from '../../types'

export const formsQuestions: InterviewQuestion[] = [
  {
    id: 28,
    category: 'Forms',
    question: 'What is the purpose of the form element?',
    answer: 'The form element wraps interactive controls that collect and submit user input to a server or JavaScript handler. It defines the submission endpoint via action, the HTTP method via method, and groups inputs that are sent together as name-value pairs. Forms are the accessible, progressive-enhancement-friendly way to gather data even when JavaScript enhances the experience.',
    code: `<form action="/api/login" method="post">
  <label for="email">Email</label>
  <input type="email" id="email" name="email" required />

  <label for="password">Password</label>
  <input type="password" id="password" name="password" required />

  <button type="submit">Sign in</button>
</form>`,
  },
  {
    id: 29,
    category: 'Forms',
    question: 'What are the most important HTML input types?',
    answer: 'HTML5 input types provide built-in validation, appropriate mobile keyboards, and semantic meaning beyond plain text. Common types include email, password, number, tel, url, date, checkbox, radio, file, search, and hidden. Each type changes browser behavior — email validates format, number shows steppers, and date opens a native picker on supported devices.',
    code: `<form>
  <input type="email" name="email" placeholder="Email" required />
  <input type="password" name="password" minlength="8" required />
  <input type="number" name="quantity" min="1" max="99" value="1" />
  <input type="date" name="delivery-date" />
  <input type="file" name="avatar" accept="image/png,image/jpeg" />
  <input type="hidden" name="csrf-token" value="abc123" />
</form>`,
  },
  {
    id: 30,
    category: 'Forms',
    question: 'How do you properly associate labels with form controls?',
    answer: 'Every form control should have an accessible name, most reliably provided by a label element linked via the for attribute matching the input id. Alternatively, wrap the input inside the label so association is implicit. Placeholder text is not a substitute for labels because it disappears on input and is often skipped by screen readers as the primary name.',
    code: `<!-- Explicit association (preferred) -->
<label for="username">Username</label>
<input type="text" id="username" name="username" autocomplete="username" />

<!-- Implicit association -->
<label>
  Subscribe to newsletter
  <input type="checkbox" name="newsletter" />
</label>

<!-- aria-label when visible label is not possible -->
<input
  type="search"
  aria-label="Search products"
  name="q"
/>`,
  },
  {
    id: 31,
    category: 'Forms',
    question: 'When should you use textarea instead of input?',
    answer: 'Use textarea for multi-line plain text input such as comments, descriptions, or message bodies, while input type="text" handles single-line values like names or search queries. Textarea supports the rows and cols attributes for default size and accepts raw text including line breaks. Unlike input, textarea content goes between opening and closing tags as default value.',
    code: `<label for="message">Your message</label>
<textarea
  id="message"
  name="message"
  rows="5"
  cols="40"
  maxlength="1000"
  placeholder="Describe your issue..."
  required
></textarea>`,
  },
  {
    id: 32,
    category: 'Forms',
    question: 'How do select and option elements work?',
    answer: 'The select element presents a dropdown (or listbox with the multiple attribute) of options the user can choose from. Each option has a value submitted with the form and optional display text between tags. The selected attribute marks the default choice, and optgroup groups related options under a label.',
    code: `<label for="country">Country</label>
<select id="country" name="country" required>
  <option value="">Select a country</option>
  <optgroup label="North America">
    <option value="US">United States</option>
    <option value="CA">Canada</option>
  </optgroup>
  <optgroup label="Europe">
    <option value="DE">Germany</option>
    <option value="FR">France</option>
  </optgroup>
</select>`,
  },
  {
    id: 33,
    category: 'Forms',
    question: 'What are fieldset and legend used for?',
    answer: 'Fieldset groups related form controls into a semantic unit, and legend provides an accessible name for that group announced by screen readers. They are essential for radio button groups and checkbox clusters where individual labels are not enough context. Disabled fieldset disables all nested controls at once.',
    code: `<fieldset>
  <legend>Shipping method</legend>

  <label>
    <input type="radio" name="shipping" value="standard" checked />
    Standard (5–7 days) — Free
  </label>

  <label>
    <input type="radio" name="shipping" value="express" />
    Express (2 days) — $9.99
  </label>
</fieldset>`,
  },
  {
    id: 34,
    category: 'Forms',
    question: 'What HTML validation attributes are available on inputs?',
    answer: 'HTML5 provides built-in constraint validation attributes that browsers enforce before form submission: required, min, max, minlength, maxlength, pattern, and type-specific rules like email format. The novalidate attribute on form disables native validation when you handle it in JavaScript. Invalid fields match :invalid CSS and fire constraint validation APIs.',
    code: `<form>
  <input type="text" name="username" required minlength="3" maxlength="20" />

  <input
    type="text"
    name="zip"
    pattern="[0-9]{5}"
    title="Five-digit ZIP code"
    required
  />

  <input type="number" name="age" min="18" max="120" required />

  <button type="submit">Register</button>
</form>`,
  },
  {
    id: 35,
    category: 'Forms',
    question: 'What is the autocomplete attribute and why use it?',
    answer: 'The autocomplete attribute hints to browsers which type of data a field expects, enabling autofill from saved profiles and password managers. Standard tokens like name, email, current-password, and street-address follow the WHATWG spec so Chrome, Safari, and Firefox fill consistently. Setting autocomplete="off" on sensitive or non-standard fields prevents incorrect suggestions.',
    code: `<form autocomplete="on">
  <input type="text" name="name" autocomplete="name" />
  <input type="email" name="email" autocomplete="email" />
  <input type="password" name="password" autocomplete="new-password" />

  <input type="text" name="address" autocomplete="shipping address-line1" />
  <input type="text" name="city" autocomplete="shipping address-level2" />
  <input type="text" name="cc" autocomplete="off" />
</form>`,
  },
  {
    id: 36,
    category: 'Forms',
    question: 'What are the different button types in HTML forms?',
    answer: 'Buttons inside forms have a type attribute that controls behavior: submit sends the form, reset clears fields to defaults, and button performs no default form action (for JavaScript handlers). If type is omitted, buttons default to submit, which can accidentally trigger submission when placed inside a form. Use button type="button" for actions like toggling UI that should not submit.',
    code: `<form action="/profile" method="post">
  <input type="text" name="display-name" />

  <button type="submit">Save changes</button>
  <button type="reset">Reset form</button>
  <button type="button" onclick="closeModal()">Cancel</button>
</form>`,
  },
  {
    id: 37,
    category: 'Forms',
    question: 'How do form action and method attributes work?',
    answer: 'The action attribute specifies the URL where form data is sent on submission, and method defines the HTTP verb — typically get for searches or post for mutations. With method="get", field values append as query string parameters; with post, they go in the request body. Enctype defaults to application/x-www-form-urlencoded but must be multipart/form-data for file uploads.',
    code: `<!-- GET: values appear in URL -->
<form action="/search" method="get">
  <input type="search" name="q" />
  <button type="submit">Search</button>
</form>
<!-- Submits to /search?q=html -->

<!-- POST: values in request body -->
<form action="/api/orders" method="post">
  <input type="hidden" name="product-id" value="42" />
  <button type="submit">Place order</button>
</form>`,
  },
  {
    id: 38,
    category: 'Forms',
    question: 'What is enctype and when do you need multipart/form-data?',
    answer: 'The enctype attribute sets the Content-Type of the submitted form data. The default application/x-www-form-urlencoded URL-encodes key-value pairs for typical text inputs. multipart/form-data is required when uploading files because binary data cannot be safely URL-encoded in a single string. Each part of a multipart body carries one field or file with its own headers.',
    code: `<form
  action="/api/upload"
  method="post"
  enctype="multipart/form-data"
>
  <label for="avatar">Profile photo</label>
  <input type="file" id="avatar" name="avatar" accept="image/*" />

  <label for="bio">Bio</label>
  <textarea id="bio" name="bio"></textarea>

  <button type="submit">Upload</button>
</form>`,
  },
  {
    id: 39,
    category: 'Forms',
    question: 'How do datalist elements enhance input fields?',
    answer: 'Datalist provides suggested values for an input without restricting the user to a fixed dropdown like select. The list attribute on input references a datalist by id, showing autocomplete suggestions while still allowing free text entry. Each option in datalist can have a value and optional label.',
    code: `<label for="city">City</label>
<input type="text" id="city" name="city" list="city-list" />

<datalist id="city-list">
  <option value="San Francisco"></option>
  <option value="New York"></option>
  <option value="Chicago"></option>
  <option value="Austin"></option>
</datalist>`,
  },
]
