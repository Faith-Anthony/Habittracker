# Email Notifications Setup Guide

## 🎯 Overview

HabitTracker supports automatic email notifications for:
- ✉️ Welcome email on signup
- ✅ Habit completion confirmations (optional)
- 🔥 Streak milestone achievements (optional)

---

## 📋 Quick Setup (2 Methods)

### Method 1: FREE - Resend (Recommended) ⭐

**Why Resend:**
- Free tier: 100 emails/day (plenty for most users)
- Easy setup (1 API key)
- Professional email templates
- Great support

**Steps:**

1. **Sign up at https://resend.com**
   - Click "Sign Up"
   - Use your email
   - Verify

2. **Get API Key**
   - Go to: https://resend.com/api-keys
   - Click "Create API Key"
   - Copy the key

3. **Add to `.env.local`**
   ```
   RESEND_API_KEY=re_your_api_key_here
   ```

4. **Test**
   - Sign up a new account
   - Check email inbox for welcome message
   - If not received, check spam folder

---

### Method 2: Supabase Built-in Emails (Free, Basic)

**Supabase provides:**
- Auth confirmation emails
- Password reset emails
- Customizable email templates

**To customize:**

1. Go to: https://app.supabase.com/projects
2. Select `habittracker`
3. **Settings** → **Auth** → **Email Templates**
4. Edit "Confirm signup" template
5. Add your welcome message

---

## 🧪 Testing Welcome Emails

### Test Locally:

1. Start dev server:
   ```bash
   npm run dev
   ```

2. Go to `http://localhost:3000/signup`

3. Sign up with test email:
   ```
   Email: test@example.com
   Password: TestPassword123
   Name: Test User
   ```

4. Check inbox for welcome email

5. If using Resend, you can also check:
   - https://resend.com/emails (shows all sent emails)

---

## 📧 Email Types

### Welcome Email (On Signup)
Sent automatically when user creates account
- Welcome message
- Quick start guide
- Link to dashboard

### Habit Completion Email (Optional)
Can be enabled in settings
- Confirmation of habit completion
- Motivation message
- Streak info

### Streak Milestone Email (Optional)
Sent when user hits milestone (7, 14, 30, 60+ days)
- Celebration message
- Achievement badge
- Encouragement

---

## 🔧 Configuration Details

### Available Settings:

**In `src/lib/email.ts`:**
- `RESEND_API_KEY` - Your Resend API key
- Email templates (customizable HTML)
- From address: `noreply@habittracker.dev`

### Customize Email Template:

Edit `src/lib/email.ts`:

```typescript
const html = `
  <!DOCTYPE html>
  <html>
    <!-- Your custom HTML here -->
  </html>
`;
```

---

## 💡 Best Practices

✅ **Do:**
- Test with your own email first
- Check spam folder if email not received
- Keep email frequency reasonable
- Use professional templates

❌ **Don't:**
- Share API keys publicly
- Send too many emails (spam risk)
- Use unstyled plain text
- Include sensitive info in emails

---

## 🚀 Production Deployment

### On Vercel:

1. Go to Vercel Dashboard
2. Select your `habittracker` project
3. **Settings** → **Environment Variables**
4. Add:
   - **Name:** `RESEND_API_KEY`
   - **Value:** Your Resend API key
5. Redeploy

### Test in Production:

1. Go to your Vercel URL (e.g., `https://habittracker.vercel.app`)
2. Sign up with new email
3. Check inbox for welcome email

---

## 📊 Monitor Email Delivery

### Resend Dashboard:

1. Go to: https://resend.com/emails
2. See all emails sent
3. Check delivery status
4. View bounce/spam reports

### Supabase Email Logs:

1. Go to: https://app.supabase.com/projects
2. Select `habittracker`
3. **Settings** → **Logs** → **Auth**
4. Filter by email events

---

## ❓ Troubleshooting

### Email not received?

**Check:**
1. ✅ Email address is correct
2. ✅ API key is valid
3. ✅ Check spam/junk folder
4. ✅ Check Resend dashboard for errors
5. ✅ Verify `.env.local` has `RESEND_API_KEY`

### "Resend API key not configured"

**Solution:**
- Add `RESEND_API_KEY` to `.env.local`
- Restart dev server
- Try signing up again

### Emails work locally but not in production

**Solution:**
- Add `RESEND_API_KEY` to Vercel environment variables
- Redeploy project
- Wait 2-3 minutes

---

## 📞 Support

- **Resend Help:** https://resend.com/docs
- **Supabase Help:** https://supabase.com/docs/guides/auth/auth-email
- **Issue?** Check the logs in Resend dashboard

---

## Next Steps

1. ✅ Sign up for Resend (if using)
2. ✅ Add API key to `.env.local`
3. ✅ Restart dev server
4. ✅ Test signup flow
5. ✅ Deploy to Vercel with environment variables

**Your users will now receive welcome emails! 🎉**
