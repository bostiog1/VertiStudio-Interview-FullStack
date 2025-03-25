import { Database } from "bun:sqlite";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export function loginUser(db: Database) {
  return async (req: Request) => {
    try {
      const { email, password } = await req.json();

      // Validate input
      if (!email || !password) {
        return new Response(
          JSON.stringify({ message: "Email and password are required" }),
          {
            status: 400,
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
      }

      // Find user in database
      const user = db.query("SELECT * FROM clients WHERE email = ?").get(email);
      if (!user) {
        return new Response(JSON.stringify({ message: "User not found" }), {
          status: 404,
          headers: {
            "Content-Type": "application/json",
          },
        });
      }

      // Verify password
      const passwordMatch = await bcrypt.compare(password, user.password);

      if (!passwordMatch) {
        return new Response(JSON.stringify({ message: "Invalid password" }), {
          status: 401,
          headers: {
            "Content-Type": "application/json",
          },
        });
      }

      // Generate JWT token
      const token = jwt.sign(
        { id: user.id, email: user.email },
        "your-secret-key",
        {
          expiresIn: "1h",
        }
      );

      // Return user data without generating token
      // The token generation will be handled in index.tsx
      //   return new Response(
      //     JSON.stringify({
      //       message: "Login successful",
      //       user: {
      //         id: user.id,
      //         name: user.name,
      //         email: user.email,
      //       },
      //     }),
      //     {
      //       status: 200,
      //       headers: {
      //         "Content-Type": "application/json",
      //       },
      //     }
      //   );
      // } catch (error) {
      //   console.error("Login error:", error);
      //   return new Response(
      //     JSON.stringify({ message: "Server error during login" }),
      //     {
      //       status: 500,
      //       headers: {
      //         "Content-Type": "application/json",
      //       },
      //     }
      //   );
      // }

      // The code below was creating an access token but this is done in index.tsx now, we just verify the database in the above code
      //     // Return both token in response body (for localStorage) and in HttpOnly cookie
      return new Response(
        JSON.stringify({
          message: "Login successful",
          // token: token, // Include token in response body
          user: {
            id: user.id,
            name: user.name,
            email: user.email,
          },
        }),
        {
          status: 200,
          headers: {
            "Content-Type": "application/json",
            "Set-Cookie": `token=${token}; HttpOnly; SameSite=Lax; Secure; Path=/; Max-Age=3600`,
          },
        }
      );
    } catch (error) {
      console.error("Login error:", error);
      return new Response(
        JSON.stringify({ message: "Server error during login" }),
        {
          status: 500,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }
  };
}
