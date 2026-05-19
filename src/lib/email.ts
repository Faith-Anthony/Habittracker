// Email service for sending welcome emails
// Option 1: Use Resend (recommended) - https://resend.com
// Option 2: Use SendGrid - https://sendgrid.com
// Option 3: Use your own SMTP

// For this implementation, we'll use Resend (free tier: 100 emails/day)
// Sign up at https://resend.com and get your API key

// Check if Resend API key is configured
const RESEND_API_KEY = process.env.RESEND_API_KEY;

interface EmailOptions {
  to: string;
  subject: string;
  html: string;
}

/**
 * Send email using Resend (requires API key in .env.local)
 * Sign up free at https://resend.com
 */
async function sendEmailViaResend(options: EmailOptions): Promise<{ success: boolean; error?: string }> {
  if (!RESEND_API_KEY) {
    console.log("Resend API key not configured. Skipping email.");
    return { success: false, error: "Resend not configured" };
  }

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "onboarding@resend.dev", // Resend test domain (free tier) - works for testing
        to: options.to,
        subject: options.subject,
        html: options.html,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Resend API error:", errorData);
      throw new Error(`Resend API error: ${response.statusText}`);
    }

    const result = await response.json();
    console.log("Email sent successfully:", result.id);
    return { success: true };
  } catch (error) {
    console.error("Error sending email via Resend:", error);
    return { success: false, error: String(error) };
  }
}

/**
 * Send welcome email to new user
 */
export async function sendWelcomeEmail(email: string): Promise<boolean> {
  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #7c3aed 0%, #9f7aea 100%); color: white; padding: 30px; border-radius: 8px 8px 0 0; text-align: center; }
          .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 8px 8px; }
          .button { background: #7c3aed; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; display: inline-block; margin: 20px 0; }
          .footer { text-align: center; color: #666; font-size: 12px; margin-top: 30px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🎯 Welcome to HabitTracker!</h1>
            <p>Your journey to better habits starts here</p>
          </div>
          <div class="content">
            <h2>Hello 👋</h2>
            <p>We're thrilled to have you join HabitTracker! This is where you'll build lasting habits and track your progress.</p>
            
            <h3>What You Can Do:</h3>
            <ul>
              <li>📊 Create and track your daily habits</li>
              <li>🔥 Build streaks and stay motivated</li>
              <li>📈 Visualize your progress over time</li>
              <li>🎯 Achieve your goals with consistency</li>
            </ul>

            <h3>Getting Started:</h3>
            <ol>
              <li>Log in to your account</li>
              <li>Click "Create New Habit"</li>
              <li>Add your first habit (e.g., "Exercise", "Read", "Meditate")</li>
              <li>Start tracking today!</li>
            </ol>

            <a href="https://your-app-url.vercel.app/dashboard" class="button">Go to Dashboard →</a>

            <h3>Need Help?</h3>
            <p>If you have any questions or need support, just reply to this email or visit our help center.</p>

            <p>Happy habit building! 💪</p>
            <p>The HabitTracker Team</p>
          </div>
          <div class="footer">
            <p>© 2024 HabitTracker. All rights reserved.</p>
            <p>You received this email because you signed up for HabitTracker.</p>
          </div>
        </div>
      </body>
    </html>
  `;

  const result = await sendEmailViaResend({
    to: email,
    subject: "🎯 Welcome to HabitTracker - Let's Build Better Habits!",
    html,
  });

  return result.success;
}

/**
 * Send habit completion email (optional)
 */
export async function sendHabitCompletionEmail(email: string, habitName: string): Promise<boolean> {
  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .success { background: #d4edda; color: #155724; padding: 20px; border-radius: 6px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="success">
            <h2>🎉 Great Job!</h2>
            <p>You just completed: <strong>${habitName}</strong></p>
            <p>Keep up the consistency - you're building momentum! 🚀</p>
          </div>
        </div>
      </body>
    </html>
  `;

  const result = await sendEmailViaResend({
    to: email,
    subject: `✅ Habit Completed: ${habitName}`,
    html,
  });

  return result.success;
}

/**
 * Send streak milestone email (optional)
 */
export async function sendStreakMilestoneEmail(
  email: string,
  habitName: string,
  streak: number
): Promise<boolean> {
  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .milestone { background: linear-gradient(135deg, #ffd700 0%, #ffed4e 100%); color: #333; padding: 30px; border-radius: 6px; text-align: center; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="milestone">
            <h2>🔥 ${streak}-Day Streak!</h2>
            <p>Amazing work on maintaining your <strong>${habitName}</strong> habit for ${streak} consecutive days!</p>
            <p>You're unstoppable! Keep going! 💪</p>
          </div>
        </div>
      </body>
    </html>
  `;

  const result = await sendEmailViaResend({
    to: email,
    subject: `🔥 ${streak}-Day Streak Milestone: ${habitName}`,
    html,
  });

  return result.success;
}
