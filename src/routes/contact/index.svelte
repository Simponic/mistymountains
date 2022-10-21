<script context="module">
  import { browser } from '$app/env';
  import { toast } from '@zerodevx/svelte-toast'
  import HCaptcha from 'svelte-hcaptcha';

  let submission = {
    name: '',
    email: '',
    message: '',
    phone: '',
    captchaToken: '',
  };

  let captcha;

  function handleSubmit (e) {
    e.preventDefault();

    if (browser) {
      const sendToast = toast.push('Sending...', {
        duration: 300,
        initial: 0,
        next: 0.2,
        dismissable: false
      });
      fetch('/contact/submit', {
        method: "POST",
        body: JSON.stringify(submission)
      })
        .then((x) => x.json())
        .then((x) => {
          toast.set(sendToast, { next: 1 });

          if (x.success) {
            toast.push('Success! Reloading...', {
              theme: {
                '--toastBackground': '#48BB78',
                '--toastBarBackground': '#2F855A'
              },
              duration: 1000,
              onpop: () => { window.location.reload(); },
            });
          } else if (x.error) {
            toast.push(x.error, {
              theme: {
                '--toastBackground': '#F56565',
                '--toastBarBackground': '#C53030'
              }
            });
          }
        })
        .catch((err) => console.log(err));
    }
  }

  function onCaptchaError () {
    toast.push('Failed to verify captcha, try again.', {
      theme: {
        '--toastBackground': '#F56565',
        '--toastBarBackground': '#C53030'
      }
    });
    captcha.reset();
  }

  function onCaptchaSuccess ({ detail: { token } }) {
    submission.captchaToken = token;
  }
</script>

<main>
  <h1 class="text-center">Let's get in touch</h1>
  <div class="d-flex justify-content-center flex-row row">
    <div class="border shadow bg-light py-2 col-lg-2 d-flex align-items-center flex-column m-2">
      <h1><i class="bi bi-map-fill"></i></h1>
      <p style="hyphens: auto;">
        <a href="https://goo.gl/maps/DdkzDQTRHBTtG8ys6">534 Trejo Street
        <br>
        Suite 200F
        <br>
        Rexburg, ID
        <br>
        83440
        </a>
      </p>
    </div>
    <div class="border shadow bg-light py-2 col-lg-2 d-flex align-items-center flex-column m-2">
      <h1><i class="bi bi-phone-fill"></i></h1>
      <p style="hyphens: auto;">
        For scheduling and other: <a href="tel:12084994517">(208) 499 - 4517</a>
        <br>
        For billing and insurance: <a href="tel:18334456077">(833) 445 - 6077 ext. 1</a>
      </p>
    </div>
    <div class="border shadow bg-light py-2 col-lg-2 d-flex align-items-center flex-column m-2">
      <h1><i class="bi bi-envelope-fill"></i></h1>
      <p style="hyphens: auto;">
        For scheduling and other: <a href="mailto:lizmmt22@gmail.com">lizmmt22@gmail.com</a>
        <br>
        Questions about MMT: <a href="mailto:jeffer@mistymountainsthreapy.com">jeffer@mistymountainstherapy.com</a>
      </p>
    </div>
  </div>
  <br>
  <h3>Or send us a message</h3>
  <form class="bg-light border shadow p-4" on:submit|preventDefault={handleSubmit}>
    <div class="row mb-2">
      <div class="form-group col-md-6">
        <label for="email">Email *</label>
        <input id="email" type="email" class="form-control" bind:value={submission.email} placeholder="johnnyappleseed@example.com" required>
      </div>
      <div class="form-group col-md-6">
        <label for="name">Name *</label>
        <input id="name" type="text" class="form-control" bind:value={submission.name} placeholder="Johnny Appleseed" required>
      </div>
    </div>
    <div class="form-group">
      <label for="phone">Phone</label>
      <input id="phone" type="text" class="form-control" bind:value={submission.phone} placeholder="(208) 123-4567">
    </div>
    <div class="form-group">
      <label for="message">Message *</label>
      <textarea id="message" class="form-control" bind:value={submission.message} rows="3" placeholder="Hello! I would like to schedule a free 15-minute consultation..." required></textarea>
    </div>
    <div class="pt-2">
      <HCaptcha 
        sitekey={import.meta.env.VITE_HCAPTCHA_KEY} 
        bind:this={captcha}
        on:success={onCaptchaSuccess}
        on:error={onCaptchaError}
      />
    </div>
    <button type="submit" class="btn btn-primary">Submit</button>
  </form>
  <br>
</main>

