
import { decrypt } from "@/lib/ciphers";
import { createPublicClient, http } from "@arkiv-network/sdk";
import { mendoza } from "@arkiv-network/sdk/chains";
import { eq, QueryResult } from "@arkiv-network/sdk/query";
import { NextRequest, NextResponse } from "next/server";

const publicClient = createPublicClient({
  chain: mendoza,
  transport: http(),
})

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    // const { searchParams } = new URL(request.url);
    // const code = searchParams.get('code');

    if (!id) {
      return NextResponse.json(
        { error: "Code parameter is required" },
        { status: 400 }
      );
    }

    const query = publicClient.buildQuery()
    const results: QueryResult = await query
      .where(eq('type', 'arklink'))
      // .where(eq('address', id))
      .where(eq('$owner', id))
      .withPayload(true)
      .withAttributes(true)
      .fetch()


    if (results.entities.length === 0) {
      return NextResponse.json(
        { error: "No data found" },
        { status: 404 }
      );
    }

    const entities = results.entities.map(e => {
      const hasEncption = e.attributes.find(attr => attr.key === 'encrypted')
      const payload = hasEncption ? decrypt(e.toText(), id) : e.toText()

      return JSON.parse(payload)
    }) 

    return NextResponse.json({
      cursor: results.cursor,    
      hasNextPage: results.hasNextPage,
      data: results.entities.map(e => e.toJson()).at(0),
    });

  } catch (error) {
    console.error('Unexpected error in /api/code:', error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
